import { applyMiddleware, legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import reducer from "../reducers";

const store = createStore(reducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
