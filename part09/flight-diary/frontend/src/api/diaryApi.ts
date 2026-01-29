import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";

const API_BASE = "/api/diaries";

export const fetchAllEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(API_BASE);
  return response.data;
};

export const submitNewEntry = async (
  entry: NewDiaryEntry,
): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(API_BASE, entry);
  return response.data;
};
