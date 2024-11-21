import { TimelineEventCallback } from "./TimelineEventCallback";

export interface Timeline {
    start: (
        intervals: Array<number>,
        relative: boolean,
        repeat: number
    ) => void;

    stop: () => void;
    pause: () => void;
    restart: () => void;

    expired: {
        listen: TimelineEventCallback;
    };
}
