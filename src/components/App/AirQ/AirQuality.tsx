import styles from "./AirQuality.module.pcss";
import React from "react";
import {
  BsEmojiDizzy,
  BsEmojiFrown,
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiSmile,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function AirQuality() {
  const air = useSelector((state: RootState) => state.air.list);

  const returnFaceIcon = (airIndex: number) => {
    switch (airIndex) {
      case 1:
        return <BsEmojiHeartEyes className={`${styles.icon} ${styles.green}`} />;
      case 2:
        return <BsEmojiSmile className={`${styles.icon} ${styles.yellow}`} />;
      case 3:
        return <BsEmojiNeutral className={`${styles.icon} ${styles.orange}`} />;
      case 4:
        return <BsEmojiFrown className={`${styles.icon} ${styles.red}`} />;
      case 5:
        return <BsEmojiDizzy className={`${styles.icon} ${styles.purple}`} />;
      default:
        throw new Error("Wrong airIndex");
    }
  };

  const returnAirCondition = (airIndex: number) => {
    switch (airIndex) {
      case 1:
        return "Good Air Quality";
      case 2:
        return "Fair Air Quality";
      case 3:
        return "Moderate Air Quality";
      case 4:
        return "Poor Air Quality";
      case 5:
        return "Very Poor Air Quality";
      default:
        throw new Error("Wrong airIndex");
    }
  };

  return (
    <React.Fragment>
      {air ? (
        <figure className={styles.airStatus}>
          {returnFaceIcon(air.main.aqi)}
          <figcaption id={styles.iconDescription}>
            {returnAirCondition(air.main.aqi)}
          </figcaption>
        </figure>
      ) : null}
    </React.Fragment>
  );
}

export default AirQuality;
