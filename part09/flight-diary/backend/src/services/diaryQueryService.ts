import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import diaryRepository from "../repositories/diaryRepository";

class DiaryQueryService {
  getAllEntries(): DiaryEntry[] {
    return diaryRepository.fetchAll();
  }

  getPublicEntries(): NonSensitiveDiaryEntry[] {
    return diaryRepository.fetchPublicEntries();
  }

  getEntryById(id: number): DiaryEntry | undefined {
    return diaryRepository.findById(id);
  }

  createEntry(entry: NewDiaryEntry): DiaryEntry {
    return diaryRepository.create(entry);
  }
}

export default new DiaryQueryService();
