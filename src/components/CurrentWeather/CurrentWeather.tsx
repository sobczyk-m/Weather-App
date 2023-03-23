import styles from "./CurrentWeather.module.pcss";
import React from "react";
import {AiOutlineDoubleRight} from "react-icons/all";
import SectionBar from "../App/SectionBar/SectionBar";

function CurrentWeather() {

    return (
        <React.Fragment>
            <div className={styles.widget}>
                <div className={styles.weatherWrapper}>
                    <div id={styles.weather}>

                    </div>
                    <div id={styles.moreBtn}>
                        <AiOutlineDoubleRight/>
                    </div>
                </div>
                <div className={styles.sectionContainer}>
                    <SectionBar/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CurrentWeather