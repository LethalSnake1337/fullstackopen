import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";

const patientsEndpoint = `${apiBaseUrl}/patients`;

export const fetchAllPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(patientsEndpoint);
  return response.data;
};

export const fetchPatientById = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${patientsEndpoint}/${id}`);
  return response.data;
};

export const createNewPatient = async (
  patientData: Omit<Patient, "id" | "entries">,
): Promise<Patient> => {
  const response = await axios.post<Patient>(patientsEndpoint, patientData);
  return response.data;
};

export const addEntryToPatient = async (
  patientId: string,
  entry: Omit<Entry, "id">,
): Promise<Patient> => {
  const response = await axios.post<Patient>(
    `${patientsEndpoint}/${patientId}/entries`,
    entry,
  );
  return response.data;
};
