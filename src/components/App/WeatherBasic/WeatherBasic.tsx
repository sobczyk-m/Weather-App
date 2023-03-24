import styles from "./WeatherBasic.module.pcss";
import React from "react";

interface WeatherBasicProps {
    location: string,
    iconSrc: string,
    iconDescription: string,
    temp: string,
    feelsLike: string,
    wind: string,
    uvi: string
}

function WeatherBasic({location, iconSrc, iconDescription, temp, feelsLike, wind, uvi}: WeatherBasicProps) {

    return (
        <React.Fragment>
            <div id={styles.weather}>
                <span id={styles.locationName}>{location}</span>
                <div id={styles.description}>
                    <div id={styles.leftColumn}>
                        <figure>
                            <img id={styles.icon} src={iconSrc} alt={"Weather condition"}/>
                            <figcaption id={styles.iconDescription}>{iconDescription}</figcaption>
                        </figure>
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

export default WeatherBasic