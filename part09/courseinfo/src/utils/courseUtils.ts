import { CoursePart } from "../types";

export const calculateTotalExercises = (modules: CoursePart[]): number => {
  return modules.reduce((total, module) => total + module.exerciseCount, 0);
};

export const getModulesByKind = (
  modules: CoursePart[],
  kind: CoursePart["kind"],
): CoursePart[] => {
  return modules.filter((module) => module.kind === kind);
};
