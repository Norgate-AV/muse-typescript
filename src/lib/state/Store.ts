export class Store<T = any> {
    private static instance: Store = null;

    private state: T;
    private listeners: Array<any> = [];
    private reducer: any;
    private dispatching: boolean = false;

    public static createStore<T = any>({
        reducer,
        initialState = {} as T,
    }): Store<T> {
        if (!this.instance) {
            this.instance = new Store<T>({
                reducer: this.combineReducers(reducer),
                initialState,
            });
        }

        return this.instance;
    }

    private static combineReducers(reducers: any) {
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

    private constructor({
        reducer,
        initialState = {} as T,
    }: {
        reducer: any;
        initialState?: T;
    }) {
        this.reducer = reducer;
        this.state = initialState;

        this.dispatch({ type: "INIT" });
    }

    public getState(): T {
        if (this.dispatching) {
            throw new Error("Cannot get state in the middle of a dispatch");
        }

        return this.state;
    }

    public dispatch(action: any): void {
        if (this.dispatching) {
            throw new Error("Cannot dispatch in the middle of a dispatch");
        }

        this.dispatching = true;

        try {
            this.state = this.reducer(this.state, action);
            this.listeners.forEach((listener) => listener(this.state));
        } finally {
            this.dispatching = false;
        }
    }

    public subscribe(listener: any): () => void {
        if (this.dispatching) {
            throw new Error("Cannot subscribe in the middle of a dispatch");
        }

        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
