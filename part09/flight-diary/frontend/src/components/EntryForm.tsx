import { NewDiaryEntry } from "../types";
import OptionButton from "./OptionButton";
import React from "react";
import { VISIBILITY_LEVELS, WEATHER_CONDITIONS } from "../constants/options";
import { FormState } from "../utils/formHandler";

interface EntryFormProps {
  form: FormState;
  error: string | null;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVisibilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWeatherChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EntryForm = ({
  form,
  error,
  onDateChange,
  onVisibilityChange,
  onWeatherChange,
  onCommentChange,
  onSubmit,
}: EntryFormProps) => {
  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            value={form.date}
            onChange={onDateChange}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <span>Visibility: </span>
          {VISIBILITY_LEVELS.map((level) => (
            <OptionButton
              key={level}
              label={level}
              isSelected={form.visibility === level}
              onChange={onVisibilityChange}
            />
          ))}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <span>Weather: </span>
          {WEATHER_CONDITIONS.map((condition) => (
            <OptionButton
              key={condition}
              label={condition}
              isSelected={form.weather === condition}
              onChange={onWeatherChange}
            />
          ))}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="comment">Comment: </label>
          <input
            type="text"
            id="comment"
            value={form.comment}
            onChange={onCommentChange}
          />
        </div>

        <button type="submit">Save entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
