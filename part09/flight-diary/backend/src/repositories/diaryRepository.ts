import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import diaryData from "../../data/entries";

class DiaryRepository {
  private store: DiaryEntry[] = diaryData;

  fetchAll(): DiaryEntry[] {
    return this.store;
  }

  fetchPublicEntries(): NonSensitiveDiaryEntry[] {
    return this.store.map(({ id, date, weather, visibility }) => ({
      id,
      date,
      weather,
      visibility,
    }));
  }

  findById(id: number): DiaryEntry | undefined {
    return this.store.find((entry) => entry.id === id);
  }

  create(newEntry: NewDiaryEntry): DiaryEntry {
    const entry: DiaryEntry = {
      id: Math.max(...this.store.map((e) => e.id)) + 1,
      ...newEntry,
    };

    this.store.push(entry);
    return entry;
  }
}

export default new DiaryRepository();
