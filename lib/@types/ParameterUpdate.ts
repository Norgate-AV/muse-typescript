export interface ParameterUpdate {
    path: string;
    id: string;
    value: string;
    newValue: string;
    oldValue: string;
    normalized: number;
    source: object;
}
