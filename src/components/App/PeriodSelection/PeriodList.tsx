import styles from "./PeriodList.module.pcss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Scope} from "../../../redux/reducers/ScopeSlice";
import {getWeatherIcon} from "../../../utils/getWeatherIcon";
import {formatTime} from "../../../utils/formatTime";

function PeriodList() {

    const dispatch = useDispatch()
    const timezone = useSelector((state: RootState) => state.location.weather.timezone!)
    const scopeData = useSelector((state: RootState) => state.scope.data)
    const dailyWeather = useSelector((state: RootState) => state.location.weather.daily)
    const hourlyWeather = useSelector((state: RootState) => state.location.weather.hourly)

    const createList = (scope: Scope) => {

        switch (scope) {
            case "8days":
                return dailyWeather!.map(day =>
                    <li key={day.dt} className={styles.period}>
                        <p>{formatTime(day.dt, timezone, "dayOfMonth")}</p>
                        <figure>
                            <img src={getWeatherIcon(day.weather[0].icon, "small")}
                                 alt={`Weather condition: ${day.weather[0].description}`}/>
                        </figure>
                        <p>{day.temp.max.toString().split(".")[0]} °C</p>
                    </li>
                )
            case "48h":
                return hourlyWeather!.map(hour =>
                    <li key={hour.dt} className={styles.period}>
                        <p>{formatTime(hour.dt, timezone, "hour")}</p>
                        <figure>
                            <img src={getWeatherIcon(hour.weather[0].icon, "small")}
                                 alt={`Weather condition: ${hour.weather[0].description}`}/>
                        </figure>
                        <p>{hour.temp.toString().split(".")[0]} °C</p>
                    </li>
                )
        }

    }

    return (
        <ul className={styles.periodList}>
            {createList(scopeData)}
        </ul>
    )
}

export default PeriodList