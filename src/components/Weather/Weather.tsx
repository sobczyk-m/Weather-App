import styles from "./Weather.module.pcss";
import React from "react";
import BasicWeather from "../App/GeneralWeather/BasicWeather";
import {AiOutlineDoubleRight} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";

function Weather() {

    return (
        <div className={styles.container}>
            <div className={styles.widget}>
                <div className={styles.weatherWrapper}>
                    <BasicWeather/>
                    <div id={styles.moreBtn}>
                        <AiOutlineDoubleRight/>
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