import { useEffect } from "react";
import { useState } from "react";
import { weatherIconService, weatherService } from "../../../services";

const CapitalWeather = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    weatherService.getWeather(latitude, longitude).then((weather) => {
      console.log("weather", weather);
      setWeather(weather);
    });
  }, []);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <p>{"Temperature: " + weather.main.temp + "°C"}</p>
      <img
        src={weatherIconService.getIconUrl(weather.weather[0].icon)}
        alt="weather icon"
        style={{ width: "100px", height: "100px" }}
      />
      <p>{"Wind: " + weather.wind.speed + " km/h"}</p>
    </div>
  );
};

export default CapitalWeather;
