import styles from "./WeatherDetail.module.pcss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatTime } from "../../utils/formatTime";
import { returnWeatherData } from "../../utils/returnWeatherData";
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
          <li className={styles.detail}>
            <p className={styles.detailName}>
              PM<sub>2.5</sub>:
            </p>
            <p className={styles.detailData}>
              {air!.components!.pm2_5.toFixed(0)} μg/m<sup>3</sup>
            </p>
            <p className={styles.directive}>
              {(
                (air!.components!.pm2_5 / whoAirQualityDirectives["PM2.5"]) *
                100
              ).toFixed()}
              %
            </p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>
              <span>
                PM<sub>10</sub>:
              </span>
            </p>
            <p className={styles.detailData}>
              {air!.components!.pm10.toFixed(0)} μg/m<sup>3</sup>
            </p>{" "}
            <p className={styles.directive}>
              {(
                (air!.components!.pm10 / whoAirQualityDirectives.PM10) *
                100
              ).toFixed()}
              %
            </p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>
              <span>
                NO<sub>2</sub>:
              </span>{" "}
            </p>
            <p className={styles.detailData}>
              {air!.components!.no2.toFixed(0)} μg/m<sup>3</sup>
            </p>
            <p className={styles.directive}>
              {(
                (air!.components!.no2 / whoAirQualityDirectives.NO2) *
                100
              ).toFixed()}
              %
            </p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>
              <span>
                O<sub>3</sub>:
              </span>{" "}
            </p>
            <p className={styles.detailData}>
              {air!.components!.o3.toFixed(0)} μg/m<sup>3</sup>
            </p>{" "}
            <p className={styles.directive}>
              {(
                (air!.components!.o3 / whoAirQualityDirectives.O3) *
                100
              ).toFixed()}
              %
            </p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>
              <span>
                SO<sub>2</sub>:
              </span>{" "}
            </p>
            <p className={styles.detailData}>
              {air!.components!.so2.toFixed(0)} μg/m<sup>3</sup>
            </p>
            <p className={styles.directive}>
              {(
                (air!.components!.so2 / whoAirQualityDirectives.SO2) *
                100
              ).toFixed()}
              %
            </p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>
              <span>CO:</span>{" "}
            </p>
            <p className={styles.detailData}>
              {air!.components!.co.toFixed(0)} μg/m<sup>3</sup>
            </p>
            <p className={styles.directive}>
              {(
                (air!.components!.co / whoAirQualityDirectives.CO) *
                100
              ).toFixed()}
              %
            </p>
          </li>
        </ul>
      ) : (
        <ul className={styles.details}>
          <li className={styles.detail}>
            <p className={styles.detailName}>Pressure:</p>
            <p className={styles.detailData}>{weather?.pressure} hPa</p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>Clouds:</p>
            <p className={styles.detailData}>{weather?.clouds} %</p>
          </li>
          <li className={styles.detail}>
            <p className={styles.detailName}>Humidity:</p>{" "}
            <p className={styles.detailData}>{weather?.humidity} %</p>
          </li>
          {weather?.sunrise ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Sunrise:</p>{" "}
              <p className={styles.detailData}>
                {formatTime(weather?.sunrise, timezone, "hour")}
              </p>
            </li>
          ) : null}
          {weather?.sunset ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Sunset:</p>{" "}
              <p className={styles.detailData}>
                {formatTime(weather?.sunset, timezone, "hour")}
              </p>
            </li>
          ) : null}
          <li className={styles.detail}>
            <p className={styles.detailName}>Dew point:</p>{" "}
            <p className={styles.detailData}>{weather?.dewPoint} °C</p>
          </li>
          {weather?.pop ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Rain probability:</p>{" "}
              <p className={styles.detailData}>{weather?.pop}%</p>
            </li>
          ) : null}
          {weather?.visibility ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Visibility:</p>{" "}
              <p className={styles.detailData}>{weather?.visibility} km</p>
            </li>
          ) : null}
          {weather?.rain ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Rain:</p>{" "}
              <p className={styles.detailData}>{weather?.rain} mm/h</p>
            </li>
          ) : null}
          {weather?.snow ? (
            <li className={styles.detail}>
              <p className={styles.detailName}>Snow:</p>{" "}
              <p className={styles.detailData}>{weather?.snow} mm/h</p>
            </li>
          ) : null}
        </ul>
      )}
    </React.Fragment>
  );
}

export default WeatherDetail;
