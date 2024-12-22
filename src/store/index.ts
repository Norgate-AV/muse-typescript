import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import volumeReducer from "./volume";

const store = configureStore({
    reducer: {
        volume: volumeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

console.log(`Current state: ${store.getState()}`);

export default store;
