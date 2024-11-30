export {};

declare global {
    export var context: Muse.Thing;
    // export var console: Muse.Log = context.log;

    namespace Muse {
        export type Thing = {
            devices: Devices;
            log: ((msg: string) => void) & Log;
            services: Services;
        };

        export type Context = Thing;

        export type Devices = {
            get: <T = any>(name: string) => T;
            has: (name: string) => boolean;
            ids: () => Array<string>;
        };

        export type Log = {
            level: "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";
            trace: (msg: any) => void;
            debug: (msg: any) => void;
            info: (msg: any) => void;
            warning: (msg: any) => void;
            error: (msg: any) => void;
        };

        export type Services = {
            get: <T = any>(name: string) => T;
        };

        export type TimelineService = {
            start: (
                intervals: Array<number>,
                relative: boolean,
                repeat: number,
            ) => void;

            stop: () => void;
            pause: () => void;
            restart: () => void;

            expired: {
                listen: (callback: Muse.TimelineEventCallback) => void;
            };
        };

        export type TimelineEventCallback = (event?: TimelineEvent) => void;

        export type TimelineEvent = BaseEvent & {
            arguments: {
                data: object;
                sequence: number;
                time: number;
                repetition: number;
            };
        };

        export type BaseEvent = {
            path: string;
            id: string;
            arguments: {
                data: object;
            };
            oldValue: object;
            source: object;
        };

        export type PlatformService = {
            venue: string;
            serialnumber: string;
            devicestate: string;
            name: string;
            description: string;
            location: string;
            model: string;
            label: string;
            family: string;
            version: string;
            manufacturer: string;
        };

        export type ICSPDriver = {
            configuration: ICSPConfiguration;
            port: Array<ICSPPort>;
            online: (callback: ICSPOnlineOfflineCallback) => void;
            offline: (callback: ICSPOnlineOfflineCallback) => void;
            isOnline: () => boolean;
            isOffline: () => boolean;
        };

        export type ICSPOnlineOfflineCallback = () => void;

        export type ICSPConfiguration = {
            device: ISCPDevice;
        };

        export type ISCPDevice = {
            classname: Readonly<string>;
            container: Readonly<string>;
            description: Readonly<string>;
            descriptorlocation: Readonly<string>;
            devicestate: Readonly<string>;
            family: Readonly<string>;
            guid: Readonly<string>;
            location: Readonly<string>;
            manufacturer: Readonly<string>;
            model: Readonly<string>;
            name: Readonly<string>;
            protocolversion: Readonly<string>;
            serialnumber: Readonly<string>;
            softwareversion: Readonly<string>;
            venue: Readonly<string>;
            version: Readonly<string>;
        };

        export type ICSPEvent = {
            data: string;
        };

        export type ICSPCustomEvent = ICSPEvent & {
            encode: string;
            flag: number;
            value1: number;
            value2: number;
            value3: number;
            id: number;
            type: number;
        };

        export type ICSPEventCallback = (event: ICSPEvent) => void;
        export type ICSPCustomEventCallback = (event: ICSPCustomEvent) => void;
        export type ICSPParameterUpdateCallback<T = any> = (
            event: ParameterUpdate<T>,
        ) => void;

        export type ICSPPort = {
            button: Array<Readonly<ICSPButton>>;
            channel: Array<boolean>;
            command: (callback: ICSPEventCallback) => void;
            custom: (callback: ICSPCustomEventCallback) => void;
            level: Array<number>;
            send_command: (data: string) => void;
            send_string: (data: string) => void;
            string: (callback: ICSPEventCallback) => void;
        };

        export type ICSPButton = {
            watch: (callback: ICSPParameterUpdateCallback<boolean>) => void;
        };

        export type ICSPChannel = {
            watch: (callback: ICSPParameterUpdateCallback<boolean>) => void;
        };

        export type ICSPLevel = {
            watch: (callback: ICSPParameterUpdateCallback<number>) => void;
        };

        export type Parameter = {
            value: string;
            normalized: number;
            min: number;
            max: number;
            defaultValue: string;
            type: string;
            enums: Array<string>;
        };

        export type ParameterUpdate<T = any> = {
            path: string;
            id: string;
            value: T;
            newValue: T;
            oldValue: T;
            normalized: number;
            source: object;
        };
    }
}
