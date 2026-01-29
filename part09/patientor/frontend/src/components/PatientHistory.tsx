import { Entry, Diagnosis } from "../types";
import EntryDetail from "./EntryDetail";

interface PatientHistoryProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientHistory = ({ entries, diagnoses }: PatientHistoryProps) => {
  return (
    <div>
      <h3>Medical History</h3>
      {entries.length === 0 ? (
        <p>No entries recorded</p>
      ) : (
        entries.map((entry) => (
          <EntryDetail
            key={entry.id}
            entry={entry}
            availableDiagnoses={diagnoses}
          />
        ))
      )}
    </div>
  );
};

export default PatientHistory;
