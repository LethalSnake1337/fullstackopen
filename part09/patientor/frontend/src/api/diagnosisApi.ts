import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const diagnoseEndpoint = `${apiBaseUrl}/diagnoses`;

export const fetchAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(diagnoseEndpoint);
  return response.data;
};

export const queryDiagnosesByCode = async (
  code: string,
): Promise<Diagnosis | undefined> => {
  const allDiagnoses = await fetchAllDiagnoses();
  return allDiagnoses.find((d) => d.code === code);
};
