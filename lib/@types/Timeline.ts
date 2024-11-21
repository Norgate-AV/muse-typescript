import { Event } from "./Event";

export interface Timeline {
    start: (
        intervals: Array<number>,
        relative: boolean,
        repeat: number
    ) => void;

    stop: () => void;
    pause: () => void;
    reset: () => void;

    expired: {
        listen: (event: any) => void;
    };
}
