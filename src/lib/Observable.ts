export interface Observable<T = any> {
    addObserver(observer: T): void;
    removeObserver(observer: T): void;
}
