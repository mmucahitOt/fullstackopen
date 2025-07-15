import DiaryList from "./components/DiaryList"
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types/diaryEntry";
import diaryService from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
 
useEffect(() => {
  diaryService.getAllDiaries().then(setDiaries);
}, []);
  return (
    <>
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
