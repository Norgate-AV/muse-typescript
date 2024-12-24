import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducer from "../reducers";

function logger(store: any) {
    return (next: any) => {
        return (action: any) => {
            console.log(`dispatching => ${action.type}`);
            console.log(
                `prev state => ${JSON.stringify(store.getState(), null, 2)}`,
            );

            let result = next(action);

            console.log(
                `next state => ${JSON.stringify(store.getState(), null, 2)}`,
            );

            return result;
        };
    };
}

const store = createStore(reducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
