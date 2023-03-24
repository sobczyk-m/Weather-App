import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ScopeState {
    data: Scope
}

export type Scope = "current" | "48h" | "8days" | "air"

const initialState: ScopeState = {
    data: "current"
}

const ScopeSlice = createSlice({
    name: "scope",
    initialState,
    reducers: {
        setScope: (state: ScopeState, action: PayloadAction<Scope>) => {
            state.data = action.payload
        }
    }
})

export const {setScope} = ScopeSlice.actions
export default ScopeSlice.reducer