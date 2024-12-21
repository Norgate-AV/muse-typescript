import { Observer } from "./Observer";

export interface Observable<T = void> {
    addObserver(observer: Observer<T>): void;
    removeObserver(observer: Observer<T>): void;
    notifyObservers(): void;
}
