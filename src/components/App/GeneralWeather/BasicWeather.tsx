import styles from "./BasicWeather.module.pcss";
import React from "react";

interface BasicWeatherProps {
    location: string,
    icon: string,
    iconDescription: string,
    temp: string,
    feelsLike: string,
    wind: string,
    uvi: string
}

function BasicWeather({location, icon, iconDescription, temp, feelsLike, wind, uvi}: BasicWeatherProps) {

    return (
        <React.Fragment>
            <div id={styles.weather}>
                <div id={styles.locationName}>{location}</div>
                <div id={styles.description}>
                    <div id={styles.leftColumn}>
                        <div id={styles.icon}>{icon}</div>
                        <div id={styles.iconDescription}>{iconDescription}</div>
                    </div>
                    <div id={styles.rightColumn}>
                        <div id={styles.temp}>{temp}<span
                            id={styles.unit}>°C</span></div>
                        <div id={styles.feelsLike}>Feels Like: {feelsLike}</div>
                        <div id={styles.wind}>Wind speed: {wind} m/s</div>
                        <div id={styles.uvi}>UV index: {uvi}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BasicWeather