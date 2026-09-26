import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// වත්මන් කාලගුණය ලබා ගැනීමට
export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error("City not found or API error!");
  }
};

// ඉදිරි දිනවල කාලගුණ අනාවැකි ලබා ගැනීමට
export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch forecast data!");
  }
};