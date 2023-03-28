import {CurrentForecast, DailyForecast, HourlyForecast} from "../redux/reducers/LocationSlice";

interface WeatherData {
    pressure: number,
    clouds: number,
    humidity: number,
    dewPoint: string,
    iconCode: string,
    iconDescription: string,
    temp: string,
    feelsLike: string,
    wind: string,
    uvi: string
    rain?: number,
    snow?: number,
    visibility?: number,
    sunrise?: number,
    sunset?: number
    pop?: number
}

export const returnWeatherData = (scope: string, currentEntry: number, current: CurrentForecast, hourly: HourlyForecast, daily: DailyForecast): WeatherData | undefined => {

    switch (scope) {
        case "current":
            return {
                iconCode: current.weather[0].icon,
                iconDescription: current.weather[0].description,
                temp: current.temp.toString().split(".")[0],
                feelsLike: current.feels_like.toString().split(".")[0],
                wind: (current.wind_speed * 3600 / 1000).toFixed(1),
                uvi: current.uvi.toFixed(1),
                clouds: current.clouds,
                pressure: current.pressure,
                visibility: current.visibility / 1000,
                dewPoint: current.dew_point.toFixed(1),
                humidity: current.humidity,
                sunrise: current.sunrise,
                sunset: current.sunset,
                rain: current.rain?.["1h"],
                snow: current.snow?.["1h"]
            }
        case "48h":
            return {
                iconCode: hourly[currentEntry].weather[0].icon,
                iconDescription: hourly[currentEntry].weather[0].description,
                temp: hourly[currentEntry].temp.toString().split(".")[0],
                feelsLike: hourly[currentEntry].feels_like.toString().split(".")[0],
                wind: (hourly[currentEntry].wind_speed * 3600 / 1000).toFixed(1),
                uvi: hourly[currentEntry].uvi.toFixed(1),
                clouds: hourly[currentEntry].clouds,
                pressure: hourly[currentEntry].pressure,
                visibility: hourly[currentEntry].visibility / 1000,
                dewPoint: hourly[currentEntry].dew_point.toFixed(1),
                humidity: hourly[currentEntry].humidity,
                pop: hourly[currentEntry].pop * 100,
                rain: hourly[currentEntry].rain?.["1h"],
                snow: hourly[currentEntry].snow?.["1h"]
            }
        case "8days":
            return {
                iconCode: daily[currentEntry].weather[0].icon,
                iconDescription: daily[currentEntry].weather[0].description,
                temp: daily[currentEntry].temp.day.toString().split(".")[0],
                feelsLike: daily[currentEntry].feels_like.day.toString().split(".")[0],
                wind: (daily[currentEntry].wind_speed * 3600 / 1000).toFixed(1),
                uvi: daily[currentEntry].uvi.toFixed(1),
                clouds: daily[currentEntry].clouds,
                pressure: daily[currentEntry].pressure,
                dewPoint: daily[currentEntry].dew_point.toFixed(1),
                humidity: daily[currentEntry].humidity,
                sunrise: daily[currentEntry].sunrise,
                sunset: daily[currentEntry].sunset,
                pop: daily[currentEntry].pop * 100,
                rain: daily[currentEntry].rain,
                snow: daily[currentEntry].snow
            }
    }
}