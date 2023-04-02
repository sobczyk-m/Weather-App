import styles from "./WeatherBasic.module.pcss";
import stylesWeather from "../Weather/Weather.module.pcss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { returnWeatherData } from "../../utils/returnWeatherData";
import { AiOutlineSearch } from "react-icons/all";
import { resetReduxData } from "../../utils/resetReduxData";

function WeatherBasic() {
  const placeName = useSelector(
    (state: RootState) => state.location.place.name
  );
  const scopePeriod = useSelector((state: RootState) => state.scope).period;
  const currentEntry = useSelector(
    (state: RootState) => state.scope
  ).currentEntry;
  const currentWeather = useSelector(
    (state: RootState) => state.location.weather.current
  )!;
  const hourlyWeather = useSelector(
    (state: RootState) => state.location.weather.hourly
  )!;
  const dailyWeather = useSelector(
    (state: RootState) => state.location.weather.daily
  )!;
  const dispatch = useDispatch();
  const weather = returnWeatherData(
    scopePeriod,
    currentEntry,
    currentWeather,
    hourlyWeather,
    dailyWeather
  );

  return (
    <React.Fragment>
      <div id={styles.weather}>
        <div className={styles.headerWrapper}>
          <span id={styles.locationName}>{placeName}</span>
          <button
            className={stylesWeather.btn}
            id={styles.searchBtn}
            onClick={() => resetReduxData(dispatch)}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div id={styles.description}>
          <div id={styles.leftColumn}>
            <figure>
              <img
                id={styles.icon}
                src={getWeatherIcon(weather!.iconCode, "large")}
                alt={"Weather condition"}
              />
              <figcaption id={styles.iconDescription}>
                {weather?.iconDescription}
              </figcaption>
            </figure>
          </div>
          <div id={styles.rightColumn}>
            <div id={styles.temp}>
              {weather?.temp}
              <span id={styles.unit}>°C</span>
            </div>
            <div id={styles.feelsLike}>Feels Like: {weather?.feelsLike}</div>
            <div id={styles.wind}>Wind speed: {weather?.wind} m/s</div>
            <div id={styles.uvi}>UV index: {weather?.uvi}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WeatherBasic;
