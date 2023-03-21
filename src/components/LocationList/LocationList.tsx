import React from "react";
import styles from './LocationList.module.pcss'
import {useDispatch} from "react-redux";
import {Forecast, setPlace, setWeather} from "../../redux/reducers/LocationSlice";
import {getEndPoint} from "../../utils/getEndPoint";

export interface Location {
    country: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
}

export type LocationCollection = Location[];

interface LocationListProps {
    locations: LocationCollection
}

function LocationList({locations}: LocationListProps) {

    const dispatch = useDispatch()

    const getWeather = async (endpoint: string): Promise<Forecast> => {
        return getEndPoint(endpoint)
    }

    const handleWeather = async (lat: number, lon: number): Promise<void> => {
        try {
            const oneCallApiUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
            const apiKey = import.meta.env.VITE_OWM_API_KEY
            const oneCallEndPoint =
                oneCallApiUrl + "lat=" + lat + "&lon=" + lon + "&units=metric" + "&exclude=minutely,alerts" + "&appid=" + apiKey

            const weather = await getWeather(oneCallEndPoint)
            dispatch(setWeather({current: weather.current, hourly: weather.hourly, daily: weather.daily}))
        } catch (e) {
            console.error(e)
        }
    }

    const createList = (collection: LocationCollection) => {
        return collection.length === 0 ?
            <li className={styles.location}>City not found</li> : collection.map((location: Location) => {
                    return (
                        <li className={styles.location}
                            onClick={async () => {
                                dispatch(setPlace({name: location.name, lat: location.lat, lon: location.lon}))
                                await handleWeather(location.lat, location.lon)
                            }}>
                            {location.name}, {location.country}, {location.state}, Geo coords: [{location.lat},
                            {location.lon}]
                        </li>
                    )
                }
            )
    }

    return (
        <ul id={styles.locations}>
            {createList(locations)}
        </ul>
    )
}

export default LocationList