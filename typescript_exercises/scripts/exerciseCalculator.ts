import {
  ExerciseResult,
  calculateExercises as _calculateExercises,
} from "../src/util";

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
