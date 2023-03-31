import styles from "./Weather.module.pcss";
import sectionBarStyles from "../App/SectionBar/SectionBar.module.pcss";
import React, { useEffect, useState } from "react";
import WeatherBasic from "../App/WeatherBasic/WeatherBasic";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import WeatherDetail from "../App/WeatherDetails/WeatherDetail";
import PeriodList from "../App/PeriodSelection/PeriodList";
import AirQuality from "../App/AirQ/AirQuality";
import Search from "../Search/Search";
import { setPlace, setWeather } from "../../redux/reducers/LocationSlice";
import { setCurrentEntry, setPeriod } from "../../redux/reducers/ScopeSlice";
import { setAirCoords, setAirData } from "../../redux/reducers/AirSlice";

function Weather() {
  const [withDetails, setWithDetails] = useState(false);
  const scopePeriod = useSelector((state: RootState) => state.scope.period);
  const dispatch = useDispatch();

  useEffect(() => {
    if (withDetails) {
      document
        .getElementsByClassName(styles.widget)[0]
        .classList.add(styles.activeDetails);
    } else {
      document
        .getElementsByClassName(styles.widget)[0]
        .classList.remove(styles.activeDetails);
    }
  }, [withDetails]);

  useEffect(() => {
    if (scopePeriod === "48h" || scopePeriod === "8days") {
      document
        .getElementById(sectionBarStyles.bar)
        ?.classList.add(sectionBarStyles.activePeriod);
    } else {
      document
        .getElementById(sectionBarStyles.bar)
        ?.classList.remove(sectionBarStyles.activePeriod);
    }
  }, [scopePeriod]);

  const showSearch = () => {
    dispatch(setAirCoords({ lon: null, lat: null }));
    dispatch(setAirData({ dt: null, main: null, components: null }));

    dispatch(
      setPlace({
        name: "",
        lat: null,
        lon: null,
      })
    );
    dispatch(
      setWeather({
        timezone: null,
        current: null,
        hourly: null,
        daily: null,
      })
    );
    dispatch(setPeriod("current"));
    dispatch(setCurrentEntry(0));
  };

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        <div id={styles.weatherWrapper}>
          {scopePeriod === "air" ? <AirQuality /> : <WeatherBasic />}
          {withDetails ? <WeatherDetail /> : null}
          <div className={styles.toolsPallet}>
            <button className={styles.btn} onClick={showSearch}>
              <AiOutlineSearch />
            </button>
            <button
              className={styles.btn}
              onClick={() => setWithDetails((prevState) => !prevState)}
            >
              {withDetails ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
            </button>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <SectionBar />
        </div>
        {scopePeriod === "48h" || scopePeriod === "8days" ? (
          <PeriodList />
        ) : null}
      </div>
    </div>
  );
}

export default Weather;
