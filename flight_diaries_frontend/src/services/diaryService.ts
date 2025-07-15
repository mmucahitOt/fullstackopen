import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/diaryEntry";
import { ResponseBody } from "../types/responseBody";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaries = async (): Promise<ResponseBody<DiaryEntry[]>> => {
  try {
    const response = await axios.get<ResponseBody<DiaryEntry[]>>(baseUrl);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.error || "Server error",
        },
      } as ResponseBody<DiaryEntry[]>;
    }
    return {
      data: [],
      error: {
        message: "Server error",
      },
    } as ResponseBody<DiaryEntry[]>;
  }
};

const createDiary = async (
  newDiary: NewDiaryEntry
): Promise<ResponseBody<DiaryEntry>> => {
  try {
    const response = await axios.post<ResponseBody<DiaryEntry>>(
      baseUrl,
      newDiary
    );
    console.log("response", response);
    return response.data;
  } catch (error: unknown) {
    console.log("error from createDiary", error);
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.error.message || "Server error",
        },
      } as ResponseBody<DiaryEntry>;
    }
    return {
      error: {
        message: "Server error",
      },
    } as ResponseBody<DiaryEntry>;
  }
};

export default { getAllDiaries, createDiary };
