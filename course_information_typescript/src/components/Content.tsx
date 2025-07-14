import type { CoursePart } from "../data/types";

export interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </>
  );
};

export default Content;