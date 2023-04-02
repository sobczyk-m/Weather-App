import { setAirCoords, setAirData } from "../redux/reducers/AirSlice";
import { setPlace, setWeather } from "../redux/reducers/LocationSlice";
import { setCurrentEntry, setPeriod } from "../redux/reducers/ScopeSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const resetReduxData = (dispatch: Dispatch) => {
  dispatch(setAirCoords({ lon: null, lat: null }));
  dispatch(setAirData({ dt: null, main: null, components: null }));

  dispatch(
    setPlace({
      name: "",
      lat: null,
      lon: null,
    })
  );
  dispatch(
    setWeather({
      timezone: null,
      current: null,
      hourly: null,
      daily: null,
    })
  );
  dispatch(setPeriod("current"));
  dispatch(setCurrentEntry(0));
};
