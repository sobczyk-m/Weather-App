import styles from "./Weather.module.pcss";
import React from "react";
import BasicWeather from "../App/GeneralWeather/BasicWeather";
import {AiOutlineDoubleRight} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function Weather() {

    const placeName = useSelector((state: RootState) => state.location.place.name)
    const iconCode = useSelector((state: RootState) => state.location.weather.current!.weather[0].icon)
    const iconDescription = useSelector((state: RootState) => state.location.weather.current!.weather[0].description)
    const temp = useSelector((state: RootState) => state.location.weather.current!.temp.toString().split(".")[0])
    const feelsLike = useSelector((state: RootState) => state.location.weather.current!.feels_like.toString().split(".")[0])
    const wind = useSelector((state: RootState) => (state.location.weather.current!.wind_speed! * 3600 / 1000).toFixed(1))
    const uvi = useSelector((state: RootState) => state.location.weather.current!.uvi.toFixed(1))


    const iconUrl = "https://openweathermap.org/img/wn/"
    const iconSize = "@4x"
    const iconEndPoint = iconUrl + iconCode + iconSize + ".png"

    return (
        <div className={styles.container}>
            <div className={styles.widget}>
                <div className={styles.weatherWrapper}>
                    <BasicWeather uvi={uvi} temp={temp} location={placeName} iconSrc={iconEndPoint}
                                  iconDescription={iconDescription} feelsLike={feelsLike} wind={wind}/>
                    <div id={styles.moreBtn}>
                        <div>
                            <AiOutlineDoubleRight/></div>
                    </div>
                </div>
                <div className={styles.sectionContainer}>
                    <SectionBar/>
                </div>
            </div>
        </div>
    )
}

export default Weather