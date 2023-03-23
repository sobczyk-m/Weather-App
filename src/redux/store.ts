import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./reducers/LocationSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>