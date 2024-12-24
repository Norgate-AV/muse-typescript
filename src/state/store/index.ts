import { createStore } from "redux";
// import logger from "redux-logger";
import reducer from "../reducers";

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
const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
