import { BaseEvent } from "./BaseEvent";

export type TimelineService = {
    start: (
        intervals: Array<number>,
        relative: boolean,
        repeat: number
    ) => void;

    stop: () => void;
    pause: () => void;
    restart: () => void;

    expired: {
        listen: (callback: TimelineEventCallback) => void;
    };
};

export type TimelineEvent = BaseEvent & {
    arguments: {
        data: object;
        sequence: number;
        time: number;
        repetition: number;
    };
};

export type TimelineEventCallback = (event?: TimelineEvent) => void;
