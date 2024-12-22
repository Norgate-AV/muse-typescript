import { Store } from "../lib/Store";
import volumeReducer from "./volume";

const store = Store.createStore({
    reducer: {
        volume: volumeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
