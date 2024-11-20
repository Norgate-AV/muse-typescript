export interface Event {
    path: string;
    id: string;
    arguments: {
        data: string;
    };
    oldValue: Event;
    source: object;
}
