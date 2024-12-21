export interface Observer<T = void> {
    update(args: T): void;
}
