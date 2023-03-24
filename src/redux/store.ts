import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./reducers/LocationSlice";
import scopeReducer from "./reducers/ScopeSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        scope: scopeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>