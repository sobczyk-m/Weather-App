import styles from "./BasicWeather.module.pcss";
import React from "react";

function BasicWeather() {

    return (
        <React.Fragment>
                    <div id={styles.weather}>
                        <div id={styles.locationName}>Tomaszów Mazowiecki, PL</div>
                        <div id={styles.description}>
                            <div id={styles.leftColumn}>
                                <div id={styles.icon}>Icon</div>
                                <div id={styles.iconDescription}>Condition</div>
                            </div>
                            <div id={styles.rightColumn}>
                                <div id={styles.temp}>{"-26"}<span id={styles.unit}>°C</span></div>
                                <div id={styles.feelsLike}>Feels Like: 22°C</div>
                                <div id={styles.wind}>Wind speed: 5.66 km/h</div>
                                <div id={styles.uvi}>UV index: 1.08</div>
                            </div>
                        </div>
                    </div>
        </React.Fragment>
    )
}

export default BasicWeather