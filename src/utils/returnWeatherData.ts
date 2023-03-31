import {
  CurrentForecast,
  DailyForecast,
  HourlyForecast,
} from "../redux/reducers/LocationSlice";
import { formatTemp } from "./formatTemp";

interface WeatherData {
  pressure: number;
  clouds: number;
  humidity: number;
  dewPoint: string;
  iconCode: string;
  iconDescription: string;
  temp: string;
  feelsLike: string;
  wind: string;
  uvi: string;
  rain?: string;
  snow?: string;
  visibility?: string;
  sunrise?: number;
  sunset?: number;
  pop?: string;
}

export const returnWeatherData = (
  scope: string,
  currentEntry: number,
  current: CurrentForecast,
  hourly: HourlyForecast,
  daily: DailyForecast
): WeatherData | undefined => {
  switch (scope) {
    case "current":
      return {
        iconCode: current.weather[0].icon,
        iconDescription: current.weather[0].description,
        temp: formatTemp(current.temp),
        feelsLike: formatTemp(current.feels_like),
        wind: ((current.wind_speed * 3600) / 1000).toFixed(1),
        uvi: current.uvi.toFixed(1),
        clouds: current.clouds,
        pressure: current.pressure,
        visibility: (current.visibility / 1000).toFixed(1),
        dewPoint: current.dew_point.toFixed(1),
        humidity: current.humidity,
        sunrise: current.sunrise,
        sunset: current.sunset,
        rain: current.rain?.["1h"]?.toFixed(),
        snow: current.snow?.["1h"]?.toFixed(),
      };
    case "48h":
      return {
        iconCode: hourly[currentEntry].weather[0].icon,
        iconDescription: hourly[currentEntry].weather[0].description,
        temp: formatTemp(hourly[currentEntry].temp),
        feelsLike: formatTemp(hourly[currentEntry].feels_like),
        wind: ((hourly[currentEntry].wind_speed * 3600) / 1000).toFixed(1),
        uvi: hourly[currentEntry].uvi.toFixed(1),
        clouds: hourly[currentEntry].clouds,
        pressure: hourly[currentEntry].pressure,
        visibility: (hourly[currentEntry].visibility / 1000).toFixed(1),
        dewPoint: hourly[currentEntry].dew_point.toFixed(1),
        humidity: hourly[currentEntry].humidity,
        pop: (hourly[currentEntry].pop * 100).toFixed(0),
        rain: hourly[currentEntry].rain?.["1h"]?.toFixed(),
        snow: hourly[currentEntry].snow?.["1h"]?.toFixed(),
      };
    case "8days":
      return {
        iconCode: daily[currentEntry].weather[0].icon,
        iconDescription: daily[currentEntry].weather[0].description,
        temp: formatTemp(daily[currentEntry].temp.day),
        feelsLike: formatTemp(daily[currentEntry].feels_like.day),
        wind: ((daily[currentEntry].wind_speed * 3600) / 1000).toFixed(1),
        uvi: daily[currentEntry].uvi.toFixed(1),
        clouds: daily[currentEntry].clouds,
        pressure: daily[currentEntry].pressure,
        dewPoint: daily[currentEntry].dew_point.toFixed(1),
        humidity: daily[currentEntry].humidity,
        sunrise: daily[currentEntry].sunrise,
        sunset: daily[currentEntry].sunset,
        pop: (daily[currentEntry].pop * 100).toFixed(),
        rain: daily[currentEntry].rain?.toFixed(),
        snow: daily[currentEntry].snow?.toFixed(),
      };
  }
};
