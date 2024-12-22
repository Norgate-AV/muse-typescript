export interface Observer<T = any> {
    update: (state: T) => void;
}
