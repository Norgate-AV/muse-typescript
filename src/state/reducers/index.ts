import { combineReducers } from "redux";
import volumeReducer from "./volume";

export default combineReducers({
    volume: volumeReducer,
});
