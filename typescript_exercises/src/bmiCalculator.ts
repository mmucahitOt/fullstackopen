export type BmiResult =
  | "Underweight"
  | "Normal weight"
  | "Overweight"
  | "Obesity";

function calculateBmi(): BmiResult {
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
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obesity";
  } else {
    throw new Error("Invalid BMI");
  }
}

console.log(calculateBmi());
