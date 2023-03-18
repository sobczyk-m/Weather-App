import React from "react";
import './locationList.pcss'

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
        return collection.length === 0 ? <li className={"location"}>City not found</li> : collection.map((location: Location) => {
                return (
                    <li className={"location"}>
                        {location.name}, {location.country}, {location.state}, Geo coords: [{location.lat},
                        {location.lon}]
                    </li>
                )
            }
        )
    }

    return (
        <ul id={"locations"}>
            {createList(props.locations)}
        </ul>
    )
}

export default LocationList