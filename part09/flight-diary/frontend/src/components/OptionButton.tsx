import React from "react";

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionButton = ({ label, isSelected, onChange }: OptionButtonProps) => {
  return (
    <label>
      <input
        type="radio"
        value={label}
        checked={isSelected}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default OptionButton;
