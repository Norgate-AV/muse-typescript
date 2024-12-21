export class Store {
    private state: any;
    private listeners: any[] = [];
    private reducer: any;

    static createStore({ reducer, initialState }): Store {
        return new Store({ reducer, initialState });
    }

    private constructor({
        reducer,
        initialState = {},
    }: {
        reducer: any;
        initialState?: any;
    }) {
        this.reducer = reducer;
        this.state = initialState;
    }

    public getState(): any {
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
