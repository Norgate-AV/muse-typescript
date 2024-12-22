export class Slice {
    public name: string;
    public initialState: any;
    public reducers: any;

    public static createSlice({
        name,
        initialState,
        reducers,
    }: {
        name: string;
        initialState: any;
        reducers: any;
    }) {
        return new Slice({ name, initialState, reducers });
    }

    public get actions(): any {
        const actions: any = {};

        for (const key of Object.keys(this.reducers)) {
            actions[key] = (payload: any) => ({
                type: `${this.name}/${key}`,
                payload,
            });
        }

        return actions;
    }

    public get reducer(): any {
        return (state = this.initialState, action: any) => {
            const reducerFunction = this.reducers[action.type];

            if (reducerFunction) {
                return reducerFunction(state, action);
            }

            return state;
        };
    }

    private constructor({
        name,
        initialState,
        reducers,
    }: {
        name: string;
        initialState: any;
        reducers: any;
    }) {
        this.name = name;
        this.initialState = initialState;
        this.reducers = reducers;
    }
}
