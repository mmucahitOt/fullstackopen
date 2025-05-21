import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const getWeather = (latitude, longitude) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
    .then((response) => {
      return response.data;
    });
};

export default { getWeather };
