import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./reducers/LocationSlice";
import scopeReducer from "./reducers/ScopeSlice";
import airReducer from "./reducers/AirSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        scope: scopeReducer,
        air: airReducer
    }
});

export type RootState = ReturnType<typeof store.getState>