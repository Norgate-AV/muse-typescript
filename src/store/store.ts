export class Store<T = any> {
    private state: T;
    private listeners: Array<any> = [];
    private reducer: any;

    public static createStore<T = any>({
        reducer,
        initialState = {} as T,
    }): Store<T> {
        return new Store<T>({ reducer, initialState });
    }

    private constructor({
        reducer,
        initialState = {} as T,
    }: {
        reducer: any;
        initialState?: T;
    }) {
        this.reducer = reducer;
        this.state = initialState;
    }

    public getState(): T {
        return this.state;
    }

    public dispatch(action: any): void {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((listener) => listener(this.state));
    }

    public subscribe(listener: any): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}

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
