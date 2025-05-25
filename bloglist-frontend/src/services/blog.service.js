import axios from "axios";
import generateURL from "./service.config";

const BLOG_API_URL = generateURL("api", "blogs");

export const getAll = async (token) => {
  const response = await axios.get(BLOG_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
