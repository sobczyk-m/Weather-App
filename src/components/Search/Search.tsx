import styles from './Search.module.pcss'
import React, {useEffect, useState} from "react";
import {BsFillSendFill, MdOutlineClose} from "react-icons/all";
import LocationList, {LocationCollection} from "../LocationList/LocationList";
import {getEndPoint} from "../../utils/getEndPoint";

export type Locations = LocationCollection | null

function Search() {
    const [focus, setFocus] = useState(false)
    const [input, setInput] = useState("")
    const [locations, setLocations] = useState<Locations>(null)

    useEffect(() => {
        handleNoInput()
    }, [input])

    const getLocationList = async (endPoint: string): Promise<LocationCollection> => {
        return getEndPoint(endPoint)
    }

    const handleNoInput = () => {
        const sendBtn = document.getElementsByClassName(styles.sendBtn)
        const cancelBtn = document.getElementsByClassName(styles.cancelBtn)

        if (input === "") {
            sendBtn[0].classList.add(styles.noInput)
            cancelBtn[0].classList.add(styles.noInput)
        } else {
            sendBtn[0].classList.remove(styles.noInput)
            cancelBtn[0].classList.remove(styles.noInput)
        }
    }

    const handleSendClick = async () => {
        try {
            const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='
            const apiKey = import.meta.env.VITE_OWM_API_KEY
            const geoEndPoint = geoApiUrl + input + "&limit=5" + "&appid=" + apiKey

            const respList = await getLocationList(geoEndPoint)
            setLocations(respList)
        } catch (e) {
            console.error(e)
        }
    }

    const handleCancelClick = () => {
        setInput("")
        locations ? setLocations(null) : null
    }

    return (
        <React.Fragment>
            <div className={styles.searchWrapper}>
                <div className={focus ? styles.search + " " + styles.noItems : styles.search}>
                    <span className={styles.sendBtn} onClick={handleSendClick}><BsFillSendFill/></span>
                    <input type="text" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                           placeholder={"Enter the city name"} className={styles.searchInput} value={input}
                           onChange={e => {
                               setInput(e.target.value)
                               locations ? setLocations(null) : null
                           }}/>
                    <span className={styles.cancelBtn} onClick={handleCancelClick}><MdOutlineClose/></span>
                </div>
                <div className={styles.locationsWrapper}>
                    {locations ? <LocationList locations={locations}/> : null}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search
