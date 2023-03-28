import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ScopeState {
    period: Scope
    currentEntry: number
}

export type Scope = "current" | "48h" | "8days" | "air"

const initialState: ScopeState = {
    period: "current",
    currentEntry: 0
}

const ScopeSlice = createSlice({
    name: "scope",
    initialState,
    reducers: {
        setPeriod: (state: ScopeState, action: PayloadAction<Scope>) => {
            state.period = action.payload
        },
        setCurrentEntry: (state: ScopeState, action: PayloadAction<number>) => {
            state.currentEntry = action.payload
        }
    }
})

export const {setPeriod, setCurrentEntry} = ScopeSlice.actions
export default ScopeSlice.reducer