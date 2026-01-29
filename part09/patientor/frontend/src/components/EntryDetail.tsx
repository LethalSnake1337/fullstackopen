import { Entry, Diagnosis, EntryType } from "../types";
import DiagnosisBadge from "./DiagnosisBadge";
import { filterDiagnosesByCode } from "../utils/dataTransformers";

interface EntryDetailProps {
  entry: Entry;
  availableDiagnoses: Diagnosis[];
}

const EntryDetail = ({ entry, availableDiagnoses }: EntryDetailProps) => {
  const diagnoses = entry.diagnosisCodes
    ? filterDiagnosesByCode(entry.diagnosisCodes, availableDiagnoses)
    : [];

  const renderEntrySpecificContent = () => {
    switch (entry.type) {
      case EntryType.HealthCheck:
        return (
          <div>
            <p>
              <strong>Health Rating:</strong> {entry.healthCheckRating}
            </p>
          </div>
        );
      case EntryType.Hospital:
        return (
          <div>
            <p>
              <strong>Discharge Date:</strong> {entry.discharge.date}
            </p>
            <p>
              <strong>Discharge Criteria:</strong> {entry.discharge.criteria}
            </p>
          </div>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <p>
              <strong>Employer:</strong> {entry.employerName}
            </p>
            {entry.sickLeave && (
              <p>
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{" "}
                {entry.sickLeave.endDate}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <p>
        <strong>{entry.date}</strong> - {entry.specialist}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      {diagnoses.length > 0 && (
        <div>
          <strong>Diagnoses:</strong>
          <div>
            {diagnoses.map((d) => (
              <DiagnosisBadge key={d.code} code={d.code} diagnosis={d} />
            ))}
          </div>
        </div>
      )}
      {renderEntrySpecificContent()}
    </div>
  );
};

export default EntryDetail;
