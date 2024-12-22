// import { Store } from "../lib/state/Store";
// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import volumeReducer from "./volume";

const store = configureStore({
    reducer: {
        volume: volumeReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
