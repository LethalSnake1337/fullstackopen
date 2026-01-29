import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  EntryWithoutId,
} from "../types";
import patientRepository from "../repositories/patientRepository";

class PatientQueryService {
  getAllPublic(): NonSensitivePatient[] {
    return patientRepository.getPublicData();
  }

  getById(id: string): Patient | undefined {
    return patientRepository.findById(id);
  }

  addNew(patient: NewPatient): Patient {
    return patientRepository.create(patient);
  }

  addEntryToPatient(
    patientId: string,
    entry: EntryWithoutId,
  ): Patient | undefined {
    return patientRepository.addEntry(patientId, entry);
  }
}

export default new PatientQueryService();
