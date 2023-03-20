import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Place {
    name: string,
    lat: number | null,
    lon: number | null
}

interface LocationState {
    place: Place
}

const initialState: LocationState = {
    place: {
        name: "",
        lat: null,
        lon: null
    }
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setPlace: (state: LocationState, action: PayloadAction<Place>) => {
            state.place = action.payload
        }
    }
})

export const {setPlace} = locationSlice.actions
export default locationSlice.reducer