import { PayloadAction } from "../../@types/PayloadAction";

export class Slice<T> {
    public name: string;
    public initialState: T;
    public reducers: any;

    public static createSlice<T>({
        name,
        initialState,
        reducers,
    }: {
        name: string;
        initialState: T;
        reducers: Record<string, ReducerFunction<T>>;
    }) {
        return new Slice<T>({ name, initialState, reducers });
    }

    public get actions(): Record<string, (payload: any) => PayloadAction> {
        const actions: Record<string, (payload: any) => PayloadAction> = {};

        for (const key of Object.keys(this.reducers)) {
            actions[key] = (payload: any) => ({
                type: `${this.name}/${key}`,
                payload,
            });
        }

        return actions;
    }

    public get reducer(): ReducerFunction<T> {
        return (state = this.initialState, action: PayloadAction) => {
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
        initialState: T;
        reducers: Record<string, ReducerFunction<T>>;
    }) {
        this.name = name;
        this.initialState = initialState;
        this.reducers = reducers;
    }
}

export type ReducerFunction<T> = (state: T, action: PayloadAction) => void;
