import styles from "./WeatherDetail.module.pcss"

interface WeatherDetailProps {
    pressure: number,
    clouds: number,
    humidity: number,
    visibility: number,
    dew_point: string,
    sunrise: string,
    sunset: string
}

function WeatherDetail({pressure, clouds, visibility, humidity, dew_point, sunrise, sunset}: WeatherDetailProps) {

    return (
            <ul id={styles.details}>
                <li className={styles.detail}><p>Pressure:<span>{pressure} hPa</span></p></li>
                <li className={styles.detail}><p>Clouds:<span>{clouds} %</span></p></li>
                <li className={styles.detail}><p>Clouds:<span>{visibility} km</span></p></li>
                <li className={styles.detail}><p>Humidity:<span>{humidity} %</span></p></li>
                <li className={styles.detail}><p>Dew point:<span>{dew_point} °C</span></p></li>
                <li className={styles.detail}><p>Sunrise:<span>{sunrise}</span></p></li>
                <li className={styles.detail}><p>Sunset:<span>{sunset}</span></p></li>
            </ul>
    )
}

export default WeatherDetail