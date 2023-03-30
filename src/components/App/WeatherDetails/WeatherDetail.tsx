import styles from "./WeatherDetail.module.pcss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { formatTime } from "../../../utils/formatTime";
import { returnWeatherData } from "../../../utils/returnWeatherData";
import React from "react";

function WeatherDetail() {
  const scopePeriod = useSelector((state: RootState) => state.scope).period;
  const currentEntry = useSelector(
    (state: RootState) => state.scope
  ).currentEntry;
  const timezone = useSelector(
    (state: RootState) => state.location.weather.timezone
  )!;
  const currentWeather = useSelector(
    (state: RootState) => state.location.weather.current
  )!;
  const hourlyWeather = useSelector(
    (state: RootState) => state.location.weather.hourly
  )!;
  const dailyWeather = useSelector(
    (state: RootState) => state.location.weather.daily
  )!;

  const air = useSelector((state: RootState) => state.air.list);
  const weather = returnWeatherData(
    scopePeriod,
    currentEntry,
    currentWeather,
    hourlyWeather,
    dailyWeather
  );

  const whoAirQualityDirectives = {
    SO2: 40,
    NO2: 25,
    PM10: 45,
    "PM2.5": 15,
    O3: 100,
    CO: 4000,
  };

  return (
    <React.Fragment>
      {scopePeriod === "air" ? (
        <ul className={styles.details}>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>
                PM<sub>2.5</sub>:
              </span>
              <span>
                {air!.components.pm2_5.toFixed(0)} μg/m<sup>3</sup>
              </span>
              <span className={styles.directive}>
                {(
                  (air!.components.pm2_5 / whoAirQualityDirectives["PM2.5"]) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>
                PM<sub>10</sub>:
              </span>
              <span>
                {air!.components.pm10.toFixed(0)} μg/m<sup>3</sup>
              </span>{" "}
              <span className={styles.directive}>
                {(
                  (air!.components.pm10 / whoAirQualityDirectives.PM10) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>
                NO<sub>2</sub>:
              </span>
              <span>
                {air!.components.no2.toFixed(0)} μg/m<sup>3</sup>
              </span>
              <span className={styles.directive}>
                {(
                  (air!.components.no2 / whoAirQualityDirectives.NO2) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>
                O<sub>3</sub>:
              </span>
              <span>
                {air!.components.o3.toFixed(0)} μg/m<sup>3</sup>
              </span>{" "}
              <span className={styles.directive}>
                {(
                  (air!.components.o3 / whoAirQualityDirectives.O3) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>
                SO<sub>2</sub>:
              </span>
              <span>
                {air!.components.so2.toFixed(0)} μg/m<sup>3</sup>
              </span>
              <span className={styles.directive}>
                {(
                  (air!.components.so2 / whoAirQualityDirectives.SO2) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
          <li className={styles.airDetail}>
            <p className={styles.airValue}>
              <span>CO:</span>
              <span>
                {air!.components.co.toFixed(0)} μg/m<sup>3</sup>
              </span>
              <span className={styles.directive}>
                {(
                  (air!.components.co / whoAirQualityDirectives.CO) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </li>
        </ul>
      ) : (
        <ul className={styles.details}>
          <li className={styles.weatherDetail}>
            <p>
              Pressure:
              <span>{weather?.pressure} hPa</span>
            </p>
          </li>
          <li className={styles.weatherDetail}>
            <p>
              Clouds:
              <span>{weather?.clouds} %</span>
            </p>
          </li>
          <li className={styles.weatherDetail}>
            <p>
              Humidity:
              <span>{weather?.humidity} %</span>
            </p>
          </li>
          {weather?.sunrise ? (
            <li className={styles.weatherDetail}>
              <p>
                Sunrise:
                <span>{formatTime(weather?.sunrise, timezone, "hour")}</span>
              </p>
            </li>
          ) : null}
          {weather?.sunset ? (
            <li className={styles.weatherDetail}>
              <p>
                Sunset:
                <span>{formatTime(weather?.sunset, timezone, "hour")}</span>
              </p>
            </li>
          ) : null}
          <li className={styles.weatherDetail}>
            <p>
              Dew point:
              <span>{weather?.dewPoint} °C</span>
            </p>
          </li>
          {weather?.pop ? (
            <li className={styles.weatherDetail}>
              <p>
                Rain probability:
                <span>{weather?.pop}%</span>
              </p>
            </li>
          ) : null}
          {weather?.visibility ? (
            <li className={styles.weatherDetail}>
              <p>
                Visibility:
                <span>{weather?.visibility} km</span>
              </p>
            </li>
          ) : null}
          {weather?.rain ? (
            <li className={styles.weatherDetail}>
              <p>
                Rain:
                <span>{weather?.rain} mm/h</span>
              </p>
            </li>
          ) : null}
          {weather?.snow ? (
            <li className={styles.weatherDetail}>
              <p>
                Snow:
                <span>{weather?.snow} mm/h</span>
              </p>
            </li>
          ) : null}
        </ul>
      )}
    </React.Fragment>
  );
}

export default WeatherDetail;
