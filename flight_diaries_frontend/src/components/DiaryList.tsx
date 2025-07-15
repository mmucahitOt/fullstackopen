
import DiaryListItem from "./DiaryDetail";
import { DiaryEntry } from "../types/diaryEntry";

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  console.log(diaries);
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2>Diary entries</h2>
    {diaries.map((diary) => <DiaryListItem key={diary.id} diary={diary} />)}
  </div>;
};

export default DiaryList;