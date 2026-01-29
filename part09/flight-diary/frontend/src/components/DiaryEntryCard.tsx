import { DiaryEntry } from "../types";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
}

const DiaryEntryCard = ({ entry }: DiaryEntryCardProps) => {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        padding: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h3>{entry.date}</h3>
      <p>
        <strong>Visibility:</strong> {entry.visibility}
      </p>
      <p>
        <strong>Weather:</strong> {entry.weather}
      </p>
    </div>
  );
};

export default DiaryEntryCard;
