import { Patient } from "../types";

interface PatientCardProps {
  patient: Patient;
  onSelect: (id: string) => void;
}

const PatientCard = ({ patient, onSelect }: PatientCardProps) => {
  return (
    <div
      onClick={() => onSelect(patient.id)}
      style={{
        padding: "1rem",
        marginBottom: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4>{patient.name}</h4>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientCard;
