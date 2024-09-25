import { useEffect, useState } from "react";
import axios from "axios";

export const Weather = ({ latitude, longitude, name }) => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m`
      )
      .then((response) => setWeatherData(response.data));
  }, [latitude, longitude]);
  console.log(weatherData);
  return (
    <>
      <h2>Weather in {name}</h2>
      <p>Temperature {weatherData.hourly.temperature_2m?.at(0)} Celcius</p>
      <p>Wind Speed: {weatherData.hourly.wind_speed_10m?.at(0)} km/h</p>
    </>
  );
};
