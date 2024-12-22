// import { ReducerFunction } from "../../@types/ReducerFunction";

// export class Store<T = any> {
//     private static instance: Store = null;

//     private state: T;
//     private listeners: Array<any> = [];
//     private reducer: ReducerFunction<T>;
//     private dispatching: boolean = false;

//     public static createStore<T = any>({ reducer }): Store<T> {
//         if (!this.instance) {
//             this.instance = new Store<T>({
//                 reducer: this.combineReducers(reducer),
//             });
//         }

//         return this.instance;
//     }

//     private static combineReducers(reducers: any) {
//         const nextState: any = {};
//         const reducerFunctions: any = {};
//         const reducerKeys = Object.keys(reducers);

//         for (const key of reducerKeys) {
//             if (typeof reducers[key] === "function") {
//                 reducerFunctions[key] = reducers[key];
//             }
//         }

//         const reducerFunctionKeys = Object.keys(reducerFunctions);

//         return (state = {}, action: any) => {
//             for (const key of reducerFunctionKeys) {
//                 nextState[key] = reducerFunctions[key](state[key], action);
//             }

//             return nextState;
//         };
//     }

//     private constructor({ reducer }: { reducer: any }) {
//         this.reducer = reducer;

//         this.dispatch({ type: "INIT" });
//     }

//     public getState(): T {
//         if (this.dispatching) {
//             throw new Error("Cannot get state in the middle of a dispatch");
//         }

//         return this.state;
//     }

//     public dispatch(action: any): void {
//         if (this.dispatching) {
//             throw new Error("Cannot dispatch in the middle of a dispatch");
//         }

//         this.dispatching = true;

//         try {
//             this.state = this.reducer(this.state, action);
//             this.listeners.forEach((listener) => listener(this.state));
//         } finally {
//             this.dispatching = false;
//         }
//     }

//     public subscribe(listener: any): () => void {
//         if (this.dispatching) {
//             throw new Error("Cannot subscribe in the middle of a dispatch");
//         }

//         this.listeners.push(listener);

//         return () => {
//             this.listeners = this.listeners.filter((l) => l !== listener);
//         };
//     }
// }
