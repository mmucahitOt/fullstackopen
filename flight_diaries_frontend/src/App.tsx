import DiaryList from "./components/DiaryList"
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types/diaryEntry";
import diaryService from "./services/diaryService";
import DiaryCreate from "./components/DiaryCreate";
import Notification from "./components/Notification";
import { NotificationType } from "./types";

function App() {
  const [notification, setNotification] = useState<NotificationType>({ message: "", type: "success" });
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      if (data && "error" in data) {
        setNotification({ message: data.error?.message || "Something went wrong", type: "error" });
      } else {
        setDiaries(data.data || []);
      }
    });
  }, []);

  const fetchDiaries = async () => {
    const data = await diaryService.getAllDiaries();
    console.log("data", data);
    if (data && "error" in data) {
      setNotification({ message: data.error?.message || "Something went wrong", type: "error" });
    } else {
      setDiaries(data.data || []);
    }
  }

  const handleNotification = ({ message, type }: NotificationType) => {
    setNotification({ message, type });
  }

  return (
    <>
      <Notification {...notification} />
      <DiaryCreate fetchDiaries={fetchDiaries} handleNotification={handleNotification} />
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
