// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from "axios";
import dotenv from "dotenv";
let openweathermapkey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const weatherService = {
  async getWeather(lat, lng) {
    try {
      let conditions;
      const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openweathermapkey}`

      await fetch(requestUrl, {
        mode: 'cors'
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          conditions = data;
        });

      let weather = {
        weatherName: conditions.weather[0].main,
        weatherDescription: conditions.weather[0].description,
        temperature: conditions.main.temp,
        windSpeed: conditions.wind.speed,
        visibility: conditions.visibility,
        clouds: conditions.clouds.all,
      }

      return weather;
    } catch (error) {
      return [];
    }
  }
}