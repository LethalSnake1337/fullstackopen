import { DiaryEntry } from "../types";
import DiaryEntryCard from "./DiaryEntryCard";

interface DiaryEntriesListProps {
  entries: DiaryEntry[];
}

const DiaryEntriesList = ({ entries }: DiaryEntriesListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        entries.map((entry) => <DiaryEntryCard key={entry.id} entry={entry} />)
      )}
    </div>
  );
};

export default DiaryEntriesList;
