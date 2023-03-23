import styles from "./SectionBar.module.pcss";
import React from "react";

function SectionBar() {

    return (
        <div className={styles.bar}>
            <div>Current</div>
            <div>48h</div>
            <div>8 days</div>
            <div>Air</div>
        </div>
    )
}

export default SectionBar