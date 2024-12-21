import { Store } from "./Store";

type State = {
    count: number;
};

const store = Store.createStore<State>({
    reducer: {},
});

export type GlobalState = ReturnType<typeof store.getState>;

export default store;
