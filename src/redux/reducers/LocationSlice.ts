import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LocationState {
    place: Place,
    weather: Forecast
}

interface Place {
    name: string,
    lat: number | null,
    lon: number | null
}

export interface Forecast {
    timezone: string | null,
    current: CurrentForecast | null,
    hourly: HourlyForecast | null,
    daily: DailyForecast | null,
}

export interface CurrentForecast extends CommonForecast {
    temp: number,
    feels_like: number,
    sunrise: number,
    sunset: number,
    visibility: number,
    rain?: {
        "1h": number,
    },
    snow?: {
        "1h": number
    }
}

interface HourForecast extends CommonForecast {
    temp: number,
    feels_like: number,
    visibility: number,
    pop: number,
    rain?: {
        "1h": number,
    },
    snow?: {
        "1h": number
    }
}

interface DayForecast extends CommonForecast {
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pop: number,
    rain?: number,
    snow?: number
}

interface CommonForecast {
    dt: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,

    weather: WeatherConditions
}

interface WeatherCondition {
    id: number,
    main: string,
    description: string,
    icon: string
}

export type HourlyForecast = HourForecast[]
export type DailyForecast = DayForecast[]
type WeatherConditions = WeatherCondition[]

const initialState: LocationState = {
    place: {
        name: "",
        lat: null,
        lon: null
    },
    weather: {
        timezone: null,
        current: null,
        hourly: null,
        daily: null,
    }
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setPlace: (state: LocationState, action: PayloadAction<Place>) => {
            state.place = action.payload
        },
        setWeather: (state: LocationState, action: PayloadAction<Forecast>) => {
            state.weather = action.payload
        }
    }
})

export const {setPlace, setWeather} = locationSlice.actions
export default locationSlice.reducer