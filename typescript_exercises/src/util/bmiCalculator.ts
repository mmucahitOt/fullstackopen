export type BmiResult =
  | "Underweight"
  | "Normal range"
  | "Overweight"
  | "Obesity";

export interface CalculateBmiParams {
  height: number;
  weight: number;
}

export function calculateBmi(params: CalculateBmiParams): BmiResult {
  const { height, weight } = params;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obesity";
  } else {
    throw new Error("Invalid BMI");
  }
}
