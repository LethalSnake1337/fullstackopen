import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types";

class PatientRepository {
  private patients: Patient[] = patientData;

  getAll(): Patient[] {
    return this.patients;
  }

  getPublicData(): NonSensitivePatient[] {
    return this.patients.map(
      ({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      }),
    );
  }

  findById(id: string): Patient | undefined {
    return this.patients.find((p) => p.id === id);
  }

  create(newPatient: NewPatient): Patient {
    const patient: Patient = {
      id: uuid(),
      ...newPatient,
    };
    this.patients.push(patient);
    return patient;
  }

  addEntry(patientId: string, entryData: EntryWithoutId): Patient | undefined {
    const patient = this.patients.find((p) => p.id === patientId);
    if (!patient) {
      return undefined;
    }

    const newEntry: Entry = {
      id: uuid(),
      ...entryData,
    };

    patient.entries.push(newEntry);
    return patient;
  }
}

export default new PatientRepository();
