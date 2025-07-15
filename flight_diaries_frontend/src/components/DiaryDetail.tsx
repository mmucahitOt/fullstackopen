import { DiaryEntry } from "../types/diaryEntry";

interface DiaryDetailProps {
  diary: DiaryEntry;
}

const DiaryListItem = ({ diary }: DiaryDetailProps) => {
  console.log(diary);
  return <div>
    <h3>{diary.date}</h3>
    <p>visibility: {diary.visibility}</p>
    <p>weather: {diary.weather}</p>
    {diary.comment && <p>comment: {diary.comment}</p>}
  </div>;
};

export default DiaryListItem;