import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Air {
  coord: Coord;
  list: AirData[];
}

export interface AirData {
  dt: number;
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

interface Coord {
  lon: number;
  lat: number;
}

interface AirState {
  coord: Coord | null;
  list: AirData | null;
}

const initialState: AirState = {
  coord: null,
  list: null,
};

const AirSlice = createSlice({
  name: "air",
  initialState,
  reducers: {
    setAirCoords: (state: AirState, action: PayloadAction<Coord>) => {
      state.coord = action.payload;
    },
    setAirData: (state: AirState, action: PayloadAction<AirData>) => {
      state.list = action.payload;
    },
  },
});

export const { setAirCoords, setAirData } = AirSlice.actions;
export default AirSlice.reducer;
