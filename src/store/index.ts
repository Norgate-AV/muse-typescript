import { createStore } from "redux";
// import logger from "redux-logger";
import volumeReducer from "./volume";

// const store = createStore({
//     reducer: {
//         volume: volumeReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             immutableCheck: false,
//             serializableCheck: false,
//         }).concat(logger),
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(volumeReducer);

export default store;
