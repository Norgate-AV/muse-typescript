import { BaseEvent } from "./BaseEvent";

export interface TimelineEvent extends BaseEvent {
    arguments: {
        data: object;
        sequence: number;
        time: number;
        repetition: number;
    };
}
