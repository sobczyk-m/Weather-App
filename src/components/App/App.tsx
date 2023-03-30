import styles from "./App.module.pcss";
import Search from "../Search/Search";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Weather from "../Weather/Weather";

function App() {
  const currentWeather = useSelector(
    (state: RootState) => state.location.weather.current
  );

  return currentWeather ? (
    <Weather />
  ) : (
    <div className={styles.center}>
      <Search />
    </div>
  );
}

export default App;
