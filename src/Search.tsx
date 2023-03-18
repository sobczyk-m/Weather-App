import './search.pcss'
import React, {useEffect, useState} from "react";
import {BsFillSendFill, MdOutlineClose} from "react-icons/all";
import LocationList, {LocationCollection} from "./LocationList";

export type Locations = LocationCollection | null

function Search() {
    const [focus, setFocus] = useState(false)
    const [input, setInput] = useState("")
    const [locations, setLocations] = useState<Locations>(null)

    const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='
    const apiKey = import.meta.env.VITE_OWM_API_KEY
    const geoEndPoint = geoApiUrl + input + "&limit=5" + "&appid=" + apiKey

    useEffect(() => {
        handleNoInput()
    }, [input])

    const getLocationList = async (endPoint: string): Promise<LocationCollection> => {
        const response = await fetch(endPoint)

        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }

    const handleNoInput = () => {
        const sendBtn = document.getElementsByClassName("send-btn")
        const cancelBtn = document.getElementsByClassName("cancel-btn")

        if (input === "") {
            sendBtn[0].classList.add("no-input")
            cancelBtn[0].classList.add("no-input")
        } else {
            sendBtn[0].classList.remove("no-input")
            cancelBtn[0].classList.remove("no-input")
        }
    }

    const handleSendClick = async () => {
        try {
            const respList = await getLocationList(geoEndPoint)
            setLocations(respList)
        } catch (e) {
            console.error(e)
        }
    }

    const handleCancelClick = () => {
        setInput("")
        locations? setLocations(null): null
    }

    return (
        <React.Fragment>
            <div className={"search-wrapper"}>
                <div className={focus ? "search no-items" : "search"}>
                    <span className={"send-btn"} onClick={handleSendClick}><BsFillSendFill/></span>
                    <input type="text" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                           placeholder={"Enter the city name"} className={"search-input"} value={input}
                           onChange={e => {
                               setInput(e.target.value)
                               locations ? setLocations(null) : null
                           }}/>
                    <span className={"cancel-btn"} onClick={handleCancelClick}><MdOutlineClose/></span>
                </div>
                <div className={"locations-wrapper"}>
                    {locations ? <LocationList locations={locations}/> : null}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search
