import DiaryList from "./components/DiaryList"
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types/diaryEntry";
import diaryService from "./services/diaryService";
import DiaryCreate from "./components/DiaryCreate";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then(setDiaries);
  }, []);

  const fetchDiaries = async () => {
    const diaries = await diaryService.getAllDiaries();
    setDiaries(diaries);
  }

  return (
    <>
      <DiaryCreate fetchDiaries={fetchDiaries} />
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
