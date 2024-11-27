declare namespace Muse {
    interface Thing {
        devices: Devices;
        log: ((...args: any) => void) & Log;
        services: Services;
    }

    interface Devices {
        get: (name: string) => string;
        has: (name: string) => boolean;
        ids: () => Array<string>;
    }

    interface Log {
        level: "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";
        trace: (...args: any) => void;
        debug: (...args: any) => void;
        info: (...args: any) => void;
        warning: (...args: any) => void;
        error: (...args: any) => void;
    }

    interface Services {
        get: (name: string) => any;
    }

    interface Timeline {
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

    type TimelineEventCallback = (event: any) => void;

    interface TimelineEvent extends BaseEvent {
        arguments: {
            data: object;
            sequence: number;
            time: number;
            repetition: number;
        };
    }

    interface BaseEvent {
        path: string;
        id: string;
        arguments: {
            data: object;
        };
        oldValue: object;
        source: object;
    }
}
