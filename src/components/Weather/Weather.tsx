import styles from "./Weather.module.pcss";
import React from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
function Weather() {

    return (
        <div className={styles.container}>
            {/*<div className={styles.wrapper}>*/}
            <CurrentWeather/>

        {/*</div>*/}
        </div>
    )
}

export default Weather