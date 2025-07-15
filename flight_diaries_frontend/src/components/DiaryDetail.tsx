import { useState } from "react";
import { DiaryEntry } from "../types/diaryEntry";

interface DiaryDetailProps {
  diary: DiaryEntry;
}

const DiaryListItem = ({ diary }: DiaryDetailProps) => {
  const [showDetails, setShowDetails] = useState(false);
  return <div>
    <h3>{diary.date}</h3>
    <p>visibility: {diary.visibility}</p>
    <p>weather: {diary.weather}</p>
    <button onClick={() => setShowDetails(!showDetails)}>
      {showDetails ? "hide comment" : "show comment"}
    </button>
    {showDetails && <div>

      {diary.comment && <p style={{ width: "150px" }}>comment: {diary.comment}</p>}
    </div>}
  </div>;
};

export default DiaryListItem;