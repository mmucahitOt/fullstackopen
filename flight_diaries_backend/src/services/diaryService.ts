import diaryData from "../../data/entries.json";
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const createDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };
  diaries.push(newDiary);
  return newDiary;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
  createDiary,
};
