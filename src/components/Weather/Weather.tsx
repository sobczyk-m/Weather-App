import styles from "./Weather.module.pcss";
import sectionBarStyles from "../App/SectionBar/SectionBar.module.pcss";
import React, {useEffect, useState} from "react";
import WeatherBasic from "../App/WeatherBasic/WeatherBasic";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import WeatherDetail from "../App/WeatherDetails/WeatherDetail";
import PeriodList from "../App/PeriodSelection/PeriodList";
import {formatTime} from "../../utils/formatTime";
import {getWeatherIcon} from "../../utils/getWeatherIcon";


function Weather() {
    const [withDetails, setWithDetails] = useState(false)

    const placeName = useSelector((state: RootState) => state.location.place.name)
    const iconCode = useSelector((state: RootState) => state.location.weather.current!.weather[0].icon)
    const iconDescription = useSelector((state: RootState) => state.location.weather.current!.weather[0].description)
    const temp = useSelector((state: RootState) => state.location.weather.current!.temp.toString().split(".")[0])
    const feelsLike = useSelector((state: RootState) => state.location.weather.current!.feels_like.toString().split(".")[0])
    const wind = useSelector((state: RootState) => (state.location.weather.current!.wind_speed! * 3600 / 1000).toFixed(1))
    const uvi = useSelector((state: RootState) => state.location.weather.current!.uvi.toFixed(1))

    const clouds = useSelector((state: RootState) => state.location.weather.current!.clouds)
    const pressure = useSelector((state: RootState) => state.location.weather.current!.pressure)
    const visibility = useSelector((state: RootState) => state.location.weather.current!.visibility / 1000)
    const dewPoint = useSelector((state: RootState) => state.location.weather.current!.dew_point.toFixed(1))
    const humidity = useSelector((state: RootState) => state.location.weather.current!.humidity)
    const timezone = useSelector((state: RootState) => state.location.weather.timezone!)
    const sunrise = useSelector((state: RootState) => state.location.weather.current!.sunrise)
    const sunset = useSelector((state: RootState) => state.location.weather.current!.sunset)

    const scope = useSelector((state: RootState) => state.scope)

    useEffect(() => {
        if (withDetails) {
            document.getElementsByClassName(styles.widget)[0].classList.add(styles.activeDetails)
        } else {
            document.getElementsByClassName(styles.widget)[0].classList.remove(styles.activeDetails)
        }

    }, [withDetails])

    useEffect(() => {
        if (scope.data === "48h" || scope.data === "8days") {
            document.getElementById(sectionBarStyles.bar)?.classList.add(sectionBarStyles.activePeriod)
        } else {
            document.getElementById(sectionBarStyles.bar)?.classList.remove(sectionBarStyles.activePeriod)
        }
    }, [scope])

    const handleMoreBtnClick = () => {
        setWithDetails(prevState => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={styles.widget}>
                <div id={styles.weatherWrapper}>
                    <WeatherBasic uvi={uvi} temp={temp} location={placeName} iconSrc={getWeatherIcon(iconCode, "large")}
                                  iconDescription={iconDescription} feelsLike={feelsLike} wind={wind}/>
                    {withDetails ? <WeatherDetail clouds={clouds} pressure={pressure} visibility={visibility}
                                                  dew_point={dewPoint} humidity={humidity}
                                                  sunrise={formatTime(sunrise, timezone, "hour")}
                                                  sunset={formatTime(sunset, timezone, "hour")}/> : null}
                    <div onClick={handleMoreBtnClick} id={styles.moreBtn}>
                        <div>
                            {withDetails ? <AiOutlineDoubleLeft className={styles.lessBtn}/> : <AiOutlineDoubleRight/>}
                        </div>
                    </div>
                </div>
                <div className={styles.sectionContainer}>
                    <SectionBar/>
                </div>
                {scope.data === "48h" || scope.data === "8days" ? <PeriodList/> : null}
            </div>
        </div>
    )
}

export default Weather