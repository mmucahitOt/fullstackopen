import type { CoursePart } from "../data/types";
import { assertNever } from "../helpers";

export interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return <div key={part.name} style={{ paddingBottom: "5px" }}>
              <b>{part.name} {part.exerciseCount}</b>
              <p>{part.description}</p>
            </div>
          case "group":
            return <div key={part.name} style={{ paddingBottom: "5px" }}>
              <b>{part.name} {part.exerciseCount}</b>
              <p>project exercises {part.groupProjectCount}</p>
            </div>
          case "background":
            return <div key={part.name} style={{ paddingBottom: "5px" }}>
              <b>{part.name} {part.exerciseCount}</b>
              <p>{part.description}</p>
              <p>{part.backgroundMaterial}</p>
            </div>
          case "special":
            return <div key={part.name} style={{ paddingBottom: "5px" }}>
              <b>{part.name} {part.exerciseCount}</b>
              <p>{part.description}</p>
              <p>required skills: {part.requirements.join(", ")}</p>
            </div>
          default: {
            assertNever(part);
          }
        }
      })}
    </>
  );
};

export default Content;