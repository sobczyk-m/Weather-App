import styles from "./PeriodList.module.pcss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Scope, setCurrentEntry } from "../../../redux/reducers/ScopeSlice";
import { getWeatherIcon } from "../../../utils/getWeatherIcon";
import { formatTime } from "../../../utils/formatTime";

function PeriodList() {
  const dispatch = useDispatch();
  const scopePeriod = useSelector((state: RootState) => state.scope.period);
  const timezone = useSelector(
    (state: RootState) => state.location.weather.timezone!
  );
  const hourlyWeather = useSelector(
    (state: RootState) => state.location.weather.hourly
  );
  const dailyWeather = useSelector(
    (state: RootState) => state.location.weather.daily
  );

  const createList = (scope: Scope) => {
    switch (scope) {
      case "48h":
        return hourlyWeather!.map((hour, index) => (
          <li
            onClick={() => dispatch(setCurrentEntry(index))}
            key={hour.dt}
            className={styles.period}
          >
            <p className={styles.timeStamp}>
              {formatTime(hour.dt, timezone, "hour")}
            </p>
            <figure className={styles.iconContainer}>
              <img
                className={styles.weatherIcon}
                src={getWeatherIcon(hour.weather[0].icon, "medium")}
                alt={hour.weather[0].description}
              />
            </figure>
            <p className={styles.temp}>
              {hour.temp.toString().split(".")[0]} °C
            </p>
          </li>
        ));
      case "8days":
        return dailyWeather!.map((day, index) => (
          <li
            onClick={() => dispatch(setCurrentEntry(index))}
            key={day.dt}
            className={styles.period}
          >
            <p className={styles.timeStamp}>
              {formatTime(day.dt, timezone, "dayOfMonth")}
            </p>
            <figure className={styles.iconContainer}>
              <img
                className={styles.weatherIcon}
                src={getWeatherIcon(day.weather[0].icon, "medium")}
                alt={day.weather[0].description}
              />
            </figure>
            <p className={styles.temp}>
              {day.temp.day.toString().split(".")[0]} °C
            </p>
          </li>
        ));
    }
  };

  return <ul className={styles.periodList}>{createList(scopePeriod)}</ul>;
}

export default PeriodList;
