export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  originalTargetValue: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  average: number;
}

export interface CalculateExercisesParams {
  hoursPerDay: number[];
  target: number;
}

export function calculateExercises(params: CalculateExercisesParams): ExerciseResult {
  const { hoursPerDay, target } = params;
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((hour) => hour > 0).length;
  const calculatedAverageTime =
    hoursPerDay.reduce((sum, hour) => sum + hour, 0) / periodLength;
  const targetReached = calculatedAverageTime >= target;
  const rating = targetReached
    ? 3
    : calculatedAverageTime >= target / 2
    ? 2
    : 1;
  const ratingDescription = targetReached
    ? "good"
    : calculatedAverageTime >= target / 2
    ? "not too bad but could be better"
    : "bad";
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    originalTargetValue: target,
    success: targetReached,
    rating: rating,
    ratingDescription: ratingDescription,
    average: calculatedAverageTime,
  };
}
