import styles from "./SectionBar.module.pcss";
import React, {useEffect, useState} from "react";

type Section = "current" | "48h" | "8days" | "air"

function SectionBar() {
    const [activeSection, setActiveSection] = useState<Section>("current")

    useEffect(() => {
        changeSection(activeSection)
    }, [activeSection])

    const changeSection = (section: Section) => {
        setActiveSection(section)
        const parent = document.getElementById(styles.bar)!.children

        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove(styles.activeSection)
        }

        document.getElementById(section)!.classList.add(styles.activeSection)
    }

    return (
        <div id={styles.bar}>
            <div onClick={() => setActiveSection("current")} id={"current"}>Current</div>
            <div onClick={() => setActiveSection("48h")} id={"48h"}>48h</div>
            <div onClick={() => setActiveSection("8days")} id={"8days"}>8 days</div>
            <div onClick={() => setActiveSection("air")} id={"air"}>Air</div>
        </div>
    )
}

export default SectionBar