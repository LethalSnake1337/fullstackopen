export interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseParams {
  dailyHours: number[];
  targetHours: number;
}

enum PerformanceRating {
  Poor = 1,
  Average = 2,
  Excellent = 3,
}

enum PerformanceFeedback {
  Poor = "You can do better!",
  Average = "Not too bad but could be better!",
  Excellent = "Good job!",
}

export const parseExerciseData = (args: string[]): ExerciseParams => {
  const inputValues = args.slice(2);

  if (inputValues.length === 0) {
    throw new Error("No exercise data provided");
  }

  const numbers = inputValues.map((val) => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error(`Invalid number: ${val}`);
    }
    return num;
  });

  return {
    dailyHours: numbers.slice(0, -1),
    targetHours: numbers[numbers.length - 1],
  };
};

const calculatePerformanceRating = (
  average: number,
  target: number,
): PerformanceRating => {
  if (average < target / 2) return PerformanceRating.Poor;
  if (average < target) return PerformanceRating.Average;
  return PerformanceRating.Excellent;
};

const getPerformanceFeedback = (
  rating: PerformanceRating,
): PerformanceFeedback => {
  switch (rating) {
    case PerformanceRating.Poor:
      return PerformanceFeedback.Poor;
    case PerformanceRating.Average:
      return PerformanceFeedback.Average;
    case PerformanceRating.Excellent:
      return PerformanceFeedback.Excellent;
    default:
      throw new Error("Unknown performance rating");
  }
};

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  const rating = calculatePerformanceRating(average, target);
  const feedback = getPerformanceFeedback(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: feedback,
    target,
    average,
  };
};
