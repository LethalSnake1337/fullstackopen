import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Work,
  LocalHospital,
  HealthAndSafety,
  Favorite,
  Male,
  Female,
} from "@mui/icons-material";
import AddEntryForm from "./AddEntryForm";
import { fetchPatientById, addEntryToPatient } from "../../api/patientApi";
import {
  Diagnosis,
  Patient,
  Entry,
  EntryFormValues,
  EntryType,
} from "../../types";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const HealthRatingIcon = ({ rating }: { rating: number }) => {
  const colors = ["#00cc00", "#ffff00", "#ff6600", "#ff0000"];
  return <Favorite style={{ color: colors[rating] || "#000" }} />;
};

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showEntryOptions, setShowEntryOptions] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<EntryType>();

  useEffect(() => {
    if (!id) return;

    const loadPatient = async () => {
      try {
        const patientData = await fetchPatientById(id);
        setPatient(patientData);
      } catch (error) {
        console.error("Failed to load patient", error);
        setError("Could not load patient data");
      } finally {
        setIsLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  const toggleForm = () => {
    setShowForm(!showForm);
    setError(undefined);
  };

  const selectEntryType = (type: EntryType) => {
    setEntryType(type);
    setShowEntryOptions(false);
    setShowForm(true);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id || !patient) return;

    try {
      const updatedPatient = await addEntryToPatient(id, values);
      setPatient(updatedPatient);
      toggleForm();
      setError(undefined);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to add entry";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="30vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Patient not found</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {patient.name}
          {patient.gender === "male" && <Male />}
          {patient.gender === "female" && <Female />}
        </Typography>
        <Typography variant="body1">SSN: {patient.ssn}</Typography>
        <Typography variant="body1">
          Occupation: {patient.occupation}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!showForm && showEntryOptions && (
          <ButtonGroup variant="text" sx={{ mt: 3 }}>
            <Button onClick={() => selectEntryType(EntryType.HealthCheck)}>
              New Health Check
            </Button>
            <Button onClick={() => selectEntryType(EntryType.Hospital)}>
              New Hospital Entry
            </Button>
            <Button
              onClick={() => selectEntryType(EntryType.OccupationalHealthcare)}
            >
              New Occupational Healthcare
            </Button>
            <Button onClick={() => setShowEntryOptions(false)}>Cancel</Button>
          </ButtonGroup>
        )}

        {!showForm && !showEntryOptions && (
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => setShowEntryOptions(true)}
          >
            Add Entry
          </Button>
        )}

        {showForm && (
          <AddEntryForm
            onCancel={toggleForm}
            onSubmit={submitNewEntry}
            entryType={entryType}
            diagnoses={diagnoses}
          />
        )}

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Medical Entries
        </Typography>

        {patient.entries.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 1 }}>
            No entries recorded
          </Typography>
        ) : (
          patient.entries.map((entry) => (
            <Stack
              key={entry.id}
              sx={{ border: 1, borderRadius: 2, padding: 2, my: 2 }}
            >
              <Typography variant="body1">
                {entry.date}{" "}
                {entry.type === EntryType.Hospital && <LocalHospital />}
                {entry.type === EntryType.HealthCheck && <HealthAndSafety />}
                {entry.type === EntryType.OccupationalHealthcare && <Work />}
              </Typography>
              <Typography variant="body2">
                <em>{entry.description}</em>
              </Typography>
              {entry.type === EntryType.HealthCheck && (
                <div>
                  <HealthRatingIcon rating={entry.healthCheckRating} />
                </div>
              )}
              {entry.type === EntryType.Hospital && (
                <Typography variant="body2">
                  Discharge: {entry.discharge.date} - {entry.discharge.criteria}
                </Typography>
              )}
              {entry.type === EntryType.OccupationalHealthcare && (
                <div>
                  <Typography variant="body2">
                    Employer: {entry.employerName}
                  </Typography>
                  {entry.sickLeave && (
                    <Typography variant="body2">
                      Sick Leave: {entry.sickLeave.startDate} to{" "}
                      {entry.sickLeave.endDate}
                    </Typography>
                  )}
                </div>
              )}
              <Typography variant="caption">
                Specialist: {entry.specialist}
              </Typography>
            </Stack>
          ))
        )}
      </Box>
    </div>
  );
};

export default PatientPage;
