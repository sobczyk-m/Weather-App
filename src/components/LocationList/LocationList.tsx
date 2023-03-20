import React from "react";
import styles from './LocationList.module.pcss'

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

function LocationList(props: LocationListProps) {
    const createList = (collection: LocationCollection) => {
        return collection.length === 0 ?
            <li className={styles.location}>City not found</li> : collection.map((location: Location) => {
                    return (
                        <li className={styles.location}>
                            {location.name}, {location.country}, {location.state}, Geo coords: [{location.lat},
                            {location.lon}]
                        </li>
                    )
                }
            )
    }

    return (
        <ul id={styles.locations}>
            {createList(props.locations)}
        </ul>
    )
}

export default LocationList