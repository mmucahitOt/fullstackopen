import { BmiResult, calculateBmi as _calculateBmi } from "../src/util";

export function calculateBmi(): BmiResult {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 2) {
    throw new Error("Too many arguments");
  }
  if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
    throw new Error("Provided values were not numbers!");
  }
  if (Number(args[0]) <= 0 || Number(args[1]) <= 0) {
    throw new Error("Provided values were not positive!");
  }
  const [height, weight] = args.map((arg) => Number(arg));

  return _calculateBmi({
    height,
    weight,
  });
}

console.log(calculateBmi());
