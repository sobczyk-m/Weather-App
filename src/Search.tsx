import './Search.pcss'
import React, {useEffect, useState} from "react";
import {BsFillSendFill, MdOutlineClose} from "react-icons/all";

interface Location {
    country: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
}

type LocationList = Location[];

function Search() {
    const [focus, setFocus] = useState(false)
    const [input, setInput] = useState("")
    const [displayResults, setDisplayResults] = useState(false)

    const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='
    const apiKey = import.meta.env.VITE_OWM_API_KEY
    const geoEndPoint = geoApiUrl + input + "&limit=5" + "&appid=" + apiKey

    useEffect(() => {
        handleNoInput()
    }, [input])

    const getLocationList = async (endPoint: string): Promise<LocationList> => {
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
        const locationsList = document.getElementById("locations")!
        locationsList.textContent = ''

        try {
            const respList = await getLocationList(geoEndPoint)
            if (respList.length === 0) {
                const locationRow = document.createElement("li")
                locationRow.className = "location"
                locationRow.innerText = `City not found`
                locationsList?.appendChild(locationRow)
            } else {
                respList.map((location) => {
                    const locationRow = document.createElement("li")
                    locationRow.className = "location"
                    locationRow.innerText = `${location.name}, ${location.country}, ${location.state}, Geo coords:[${location.lat}, ${location.lon}]`
                    locationsList?.appendChild(locationRow)
                })
            }
        } catch (e) {
            console.error(e)
        }
        setDisplayResults(true)
    }

    const handleDeleteClick = () => {
        const locationsList = document.getElementById("locations")!
        locationsList.textContent = ''
        setDisplayResults(false)
    }

    const deleteResults = () => {
        if (displayResults) {
            const locationsList = document.getElementById("locations")!
            locationsList.textContent = ''
        }
    }

    return (
        <React.Fragment>
            <div className={"search-wrapper"}>
                <div className={focus ? "search no-items" : "search"}>
                    {/*<div className={"search no-items"}>*/}
                    <span className={"send-btn"} onClick={handleSendClick}><BsFillSendFill/></span>
                    <input type="text" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                           placeholder={"Enter the city name"} className={"search-input"} value={input}
                           onChange={e => {
                               setInput(e.target.value)
                               setDisplayResults(false)
                               deleteResults()
                           }}/>
                    <span className={"cancel-btn"} onClick={handleDeleteClick}><MdOutlineClose/></span>
                </div>
                <div className={"locations-wrapper"}>
                    <ul id={"locations"} className={displayResults ? "with-items" : "no-items"}></ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search
