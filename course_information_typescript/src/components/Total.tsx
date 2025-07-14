export interface TotalProps {
  totalNumberOfExercises: number;
}

const Total = ({ totalNumberOfExercises }: TotalProps) => {
  return <p>Number of exercises {totalNumberOfExercises}</p>;
};

export default Total;