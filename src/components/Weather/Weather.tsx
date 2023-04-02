import styles from "./Weather.module.pcss";
import sectionBarStyles from "../SectionBar/SectionBar.module.pcss";
import React, { useEffect, useState } from "react";
import WeatherBasic from "../WeatherBasic/WeatherBasic";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from "react-icons/all";
import SectionBar from "../SectionBar/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import WeatherDetail from "../WeatherDetails/WeatherDetail";
import PeriodList from "../PeriodSelection/PeriodList";
import AirQuality from "../AirQuality/AirQuality";
import { resetReduxData } from "../../utils/resetReduxData";

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

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        <div id={styles.weatherWrapper}>
          {scopePeriod === "air" ? <AirQuality /> : <WeatherBasic />}
          {withDetails ? <WeatherDetail /> : null}
          <div className={styles.toolsPallet}>
            <button
              className={styles.btn}
              id={styles.searchBtn}
              onClick={() => resetReduxData(dispatch)}
            >
              <AiOutlineSearch />
            </button>
            <button
              className={styles.btn}
              onClick={() => setWithDetails((prevState) => !prevState)}
            >
              {withDetails ? (
                <AiOutlineDoubleLeft id={styles.lessBtn} />
              ) : (
                <AiOutlineDoubleRight id={styles.moreBtn} />
              )}
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
