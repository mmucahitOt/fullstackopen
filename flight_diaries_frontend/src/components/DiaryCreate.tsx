import { useState } from "react";


const DiaryCreate = () => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(date, weather, visibility, comment);
  };

  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2>Add a new entry</h2>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} >
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Weather" value={weather} onChange={(e) => setWeather(e.target.value)} />
      <input type="text" placeholder="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
      <input type="text" placeholder="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">add</button>
    </form>
  </div>;
};

export default DiaryCreate;