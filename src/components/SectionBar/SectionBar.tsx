import styles from "./SectionBar.module.pcss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Scope,
  setCurrentEntry,
  setPeriod,
} from "../../redux/reducers/ScopeSlice";

function SectionBar() {
  const dispatch = useDispatch();
  const scopePeriod = useSelector((state: RootState) => state.scope.period);

  useEffect(() => {
    changeActiveSection(scopePeriod);
  }, [scopePeriod]);

  const changeActiveSection = (section: Scope) => {
    const parent = document.getElementById(styles.bar)!.children;
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove(styles.activeSection);
    }

    document.getElementById(section)!.classList.add(styles.activeSection);
  };

  return (
    <div id={styles.bar}>
      <div onClick={() => dispatch(setPeriod("current"))} id={"current"}>
        Current
      </div>
      <div
        onClick={() => {
          dispatch(setPeriod("48h"));
          dispatch(setCurrentEntry(0));
        }}
        id={"48h"}
      >
        48h
      </div>
      <div
        onClick={() => {
          dispatch(setPeriod("8days"));
          dispatch(setCurrentEntry(0));
        }}
        id={"8days"}
      >
        8 days
      </div>
      <div
        onClick={() => {
          dispatch(setPeriod("air"));
          dispatch(setCurrentEntry(0));
        }}
        id={"air"}
      >
        Air
      </div>
    </div>
  );
}

export default SectionBar;
