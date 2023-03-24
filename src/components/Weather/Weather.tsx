import styles from "./Weather.module.pcss";
import React, {useState} from "react";
import WeatherBasic from "../App/WeatherBasic/WeatherBasic";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import WeatherDetail from "../App/WeatherDetails/WeatherDetail";

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


    function formatTime(unixTime: number, timezone: string) {
        const dtFormat = new Intl.DateTimeFormat('pl-PL', {
            timeStyle: 'short',
            timeZone: timezone
        });

        return dtFormat.format(new Date(unixTime * 1e3));
    }

    const iconUrl = "https://openweathermap.org/img/wn/"
    const iconSize = "@4x"
    const iconEndPoint = iconUrl + iconCode + iconSize + ".png"

    const handleMoreBtnClick = () => {
        setWithDetails(prevState => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={styles.widget}>
                <div id={styles.weatherWrapper}>
                    <WeatherBasic uvi={uvi} temp={temp} location={placeName} iconSrc={iconEndPoint}
                                  iconDescription={iconDescription} feelsLike={feelsLike} wind={wind}/>
                    {withDetails ? <WeatherDetail clouds={clouds} pressure={pressure} visibility={visibility}
                                                  dew_point={dewPoint} humidity={humidity}
                                                  sunrise={formatTime(sunrise, timezone)}
                                                  sunset={formatTime(sunset, timezone)}/> : null}
                    <div onClick={handleMoreBtnClick} id={styles.moreBtn}>
                        <div>
                            {withDetails ? <AiOutlineDoubleLeft className={styles.lessBtn}/> :
                                <AiOutlineDoubleRight/>}
                        </div>
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