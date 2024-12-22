export interface Observer<T> {
    update: (state: T) => void;
}
