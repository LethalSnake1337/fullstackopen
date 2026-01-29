import { useState } from "react";

export const useInputField = (fieldType) => {
  const [fieldVal, setFieldVal] = useState("");

  const handleInputChange = (evt) => {
    setFieldVal(evt.target.value);
  };

  const onReset = () => setFieldVal("");

  return {
    type: fieldType,
    value: fieldVal,
    onChange: handleInputChange,
    onReset,
  };
};
