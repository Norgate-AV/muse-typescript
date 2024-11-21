export interface BaseEvent {
    path: string;
    id: string;
    arguments: {
        data: object;
    };
    oldValue: object;
    source: object;
}
