import { useState } from "react";
import diaryService from "../services/diaryService";
import { Weather } from "../types";
import { Visibility } from "../types";
import { NotificationType } from "../types";

export interface DiaryCreateProps {
  fetchDiaries: () => void;
  handleNotification: (notification: NotificationType) => void;
}

const DiaryCreate = ({ fetchDiaries, handleNotification }: DiaryCreateProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.good);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    diaryService.createDiary({ date, weather: weather as Weather, visibility: visibility as Visibility, comment }).then((data) => {
      if (data && "error" in data) {
        handleNotification({ message: data.error?.message || "Something went wrong", type: "error" });
      } else {
        handleNotification({ message: "Diary created successfully", type: "success" });
        fetchDiaries();
        setDate("");
        setWeather(Weather.sunny);
        setVisibility(Visibility.good);
        setComment("");
      }
    })
  };

  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2>Add a new entry</h2>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} >
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <div>
        {Object.values(Weather).map((weather) => (
          <label key={weather}>
            <input type="radio" name="weather" value={weather} onChange={(e) => setWeather(e.target.value)} />
            {weather}
          </label>
        ))}
      </div>
      <div>
        {Object.values(Visibility).map((visibility) => (
          <label key={visibility}>
            <input type="radio" name="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
            {visibility}
          </label>
        ))}
      </div>
      <input type="text" placeholder="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">add</button>
    </form>
  </div>;
};

export default DiaryCreate;