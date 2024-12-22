import { Store } from "../lib/Store";

export type State = {
    count: number;
};

const store = Store.createStore({
    reducer: {},
});

export type GlobalState = ReturnType<typeof store.getState>;

export default store;
