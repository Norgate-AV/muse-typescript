import { Page, Pages } from "../pages";
import { Popup, Popups } from "../popups";
import { Source } from "../sources";
import { Config } from "../utils/getConfig";

type State = {
    selectedSource: Source | null;
    currentSource: Source | null;

    requiredPage: Page;
    requiredPopup: Popup;

    config: Config | null;
};

export const state: State = {
    selectedSource: null,
    currentSource: null,

    requiredPage: Pages.Logo,
    requiredPopup: Popups.Off,

    config: null,
};

const store = createStore({
    reducer: {},
});

export function combineReducers(reducers: any) {
    const nextState: any = {};
    const reducerFunctions: any = {};
    const reducerKeys = Object.keys(reducers);

    for (const key of reducerKeys) {
        if (typeof reducers[key] === "function") {
            reducerFunctions[key] = reducers[key];
        }
    }

    const reducerFunctionKeys = Object.keys(reducerFunctions);

    return (state = {}, action: any) => {
        for (const key of reducerFunctionKeys) {
            nextState[key] = reducerFunctions[key](state[key], action);
        }

        return nextState;
    };
}

export function createStore(rootReducer: any, initialState: any = {}) {
    let state = initialState;
    let listeners: any[] = [];

    const getState = () => state;

    const dispatch = (action: any) => {
        state = rootReducer(state, action);
        listeners.forEach((listener) => listener(state));
    };

    const subscribe = (listener: any) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
}

export type RootState = ReturnType<typeof store.getState>;
