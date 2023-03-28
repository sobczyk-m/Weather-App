import styles from "./WeatherDetail.module.pcss"
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {formatTime} from "../../../utils/formatTime";
import {returnWeatherData} from "../../../utils/returnWeatherData";

function WeatherDetail() {

    const scopePeriod = useSelector((state: RootState) => state.scope).period
    const currentEntry = useSelector((state: RootState) => state.scope).currentEntry
    const timezone = useSelector((state: RootState) => state.location.weather.timezone)!
    const currentWeather = useSelector((state: RootState) => state.location.weather.current)!
    const hourlyWeather = useSelector((state: RootState) => state.location.weather.hourly)!
    const dailyWeather = useSelector((state: RootState) => state.location.weather.daily)!

    const weather = returnWeatherData(scopePeriod, currentEntry, currentWeather, hourlyWeather, dailyWeather)

    return (
        <ul id={styles.details}>
            <li className={styles.detail}><p>Pressure:<span className={styles.value}>{weather?.pressure} hPa</span></p>
            </li>
            <li className={styles.detail}><p>Clouds:<span className={styles.value}>{weather?.clouds} %</span></p></li>
            <li className={styles.detail}><p>Humidity:<span className={styles.value}>{weather?.humidity} %</span></p>
            </li>
            {weather?.sunrise ?
                <li className={styles.detail}><p>Sunrise:<span
                    className={styles.value}>{formatTime(weather?.sunrise, timezone, "hour")}</span></p></li> : null}
            {weather?.sunset ?
                <li className={styles.detail}><p>Sunset:<span
                    className={styles.value}>{formatTime(weather?.sunset, timezone, "hour")}</span></p></li> : null}
            <li className={styles.detail}><p>Dew point:<span className={styles.value}>{weather?.dewPoint} °C</span></p>
            </li>
            {weather?.pop ?
                <li className={styles.detail}><p>Rain probability:<span className={styles.value}>{weather?.pop}%</span>
                </p></li> : null}{weather?.visibility ?
            <li className={styles.detail}><p>Visibility:<span className={styles.value}>{weather?.visibility} km</span>
            </p></li> : null}{weather?.rain ?
            <li className={styles.detail}><p>Rain:<span className={styles.value}>{weather?.rain} mm/h</span></p>
            </li> : null}{weather?.snow ?
            <li className={styles.detail}><p>Snow:<span className={styles.value}>{weather?.snow} mm/h</span></p>
            </li> : null}
        </ul>
    )
}

export default WeatherDetail