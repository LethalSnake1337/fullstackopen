import { NewDiaryEntry } from "../types";

export interface FormState {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export const initialFormState: FormState = {
  date: "",
  visibility: "",
  weather: "",
  comment: "",
};

export const resetForm = (): FormState => ({ ...initialFormState });

export const validateForm = (form: FormState): string | null => {
  if (!form.date || !form.visibility || !form.weather || !form.comment) {
    return "All fields are required";
  }
  return null;
};

export const buildEntryFromForm = (form: FormState): NewDiaryEntry => ({
  date: form.date,
  visibility: form.visibility,
  weather: form.weather,
  comment: form.comment,
});
