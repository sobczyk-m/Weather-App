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
import AirQuality from "../App/AirQ/AirQuality";

function Weather() {
    const [withDetails, setWithDetails] = useState(false)
    const scopePeriod = useSelector((state: RootState) => state.scope.period)

    useEffect(() => {
        if (withDetails) {
            document.getElementsByClassName(styles.widget)[0].classList.add(styles.activeDetails)
        } else {
            document.getElementsByClassName(styles.widget)[0].classList.remove(styles.activeDetails)
        }

    }, [withDetails])

    useEffect(() => {
        if (scopePeriod === "48h" || scopePeriod === "8days") {
            document.getElementById(sectionBarStyles.bar)?.classList.add(sectionBarStyles.activePeriod)
        } else {
            document.getElementById(sectionBarStyles.bar)?.classList.remove(sectionBarStyles.activePeriod)
        }
    }, [scopePeriod])

    return (
        <div className={styles.container}>
            <div className={styles.widget}>
                <div id={styles.weatherWrapper}>
                    {scopePeriod === "air" ? <AirQuality/> : <WeatherBasic/>}
                    {withDetails ? <WeatherDetail/> : null}
                    <div onClick={() => setWithDetails(prevState => !prevState)} id={styles.moreBtn}>
                        <div>
                            {withDetails ? <AiOutlineDoubleLeft className={styles.lessBtn}/> : <AiOutlineDoubleRight/>}
                        </div>
                    </div>
                </div>
                <div className={styles.sectionContainer}>
                    <SectionBar/>
                </div>
                {scopePeriod === "48h" || scopePeriod === "8days" ? <PeriodList/> : null}
            </div>
        </div>
    )
}

export default Weather