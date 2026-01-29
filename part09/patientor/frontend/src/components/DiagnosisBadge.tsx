import { Diagnosis } from "../types";

interface DiagnosisBadgeProps {
  code: string;
  diagnosis?: Diagnosis;
}

const DiagnosisBadge = ({ code, diagnosis }: DiagnosisBadgeProps) => {
  const displayText = diagnosis ? `${code} ${diagnosis.name}` : code;

  return (
    <div
      style={{
        display: "inline-block",
        marginRight: "0.5rem",
        padding: "0.25rem 0.5rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        fontSize: "0.9rem",
      }}
    >
      {displayText}
    </div>
  );
};

export default DiagnosisBadge;
