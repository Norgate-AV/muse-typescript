export type ParameterUpdate<T> = {
    path: string;
    id: string;
    value: T;
    newValue: T;
    oldValue: T;
    normalized: number;
    source: object;
};
