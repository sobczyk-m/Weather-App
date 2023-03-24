import styles from "./SectionBar.module.pcss";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Scope, setScope} from "../../../redux/reducers/ScopeSlice";

function SectionBar() {

    const dispatch = useDispatch()
    const scopeData = useSelector((state: RootState) => state.scope.data)

    useEffect(() => {
        changeActiveSection(scopeData)
    }, [scopeData])

    const changeActiveSection = (section: Scope) => {

        const parent = document.getElementById(styles.bar)!.children
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove(styles.activeSection)
        }

        document.getElementById(section)!.classList.add(styles.activeSection)
    }

    return (
        <div id={styles.bar}>
            <div onClick={() => dispatch(setScope("current"))} id={"current"}>Current</div>
            <div onClick={() => dispatch(setScope("48h"))} id={"48h"}>48h</div>
            <div onClick={() => dispatch(setScope("8days"))} id={"8days"}>8 days</div>
            <div onClick={() => dispatch(setScope("air"))} id={"air"}>Air</div>
        </div>
    )
}

export default SectionBar