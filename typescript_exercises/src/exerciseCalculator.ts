interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  originalTargetValue: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  average: number;
}

interface CalculateExercisesParams {
  hoursPerDay: number[];
  target: number;
}

function _calculateExercises(params: CalculateExercisesParams): ExerciseResult {
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

function calculateExercises(): ExerciseResult {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    throw new Error("Provided array must contain target and hours per day");
  }

  if (args.some((arg) => isNaN(Number(arg)))) {
    throw new Error("Provided array must contain only numbers");
  }

  if (args.some((arg) => Number(arg) < 0)) {
    throw new Error("Provided array must contain only positive numbers");
  }

  const hoursPerDay = args.slice(1).map((arg) => Number(arg));
  const target = Number(args[0]);

  return _calculateExercises({ hoursPerDay, target });
}

console.log(calculateExercises());
