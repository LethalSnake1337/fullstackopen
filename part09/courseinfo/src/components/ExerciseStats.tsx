import { CoursePart } from "../types";
import { calculateTotalExercises } from "../utils/courseUtils";

interface ExerciseStatsProps {
  modules: CoursePart[];
}

const ExerciseStats = ({ modules }: ExerciseStatsProps) => {
  const totalExercises = calculateTotalExercises(modules);

  return (
    <p>
      Number of exercises <strong>{totalExercises}</strong>
    </p>
  );
};

export default ExerciseStats;
