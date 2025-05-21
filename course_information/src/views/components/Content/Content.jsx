import Part from "./Part";

const Content = ({ parts }) => {
  console.log("parts: ", parts);
  if (parts === undefined || parts.length === 0) return null;
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
