export {};

declare global {
    var MuseControlSystem: typeof import("./MuseControlSystem").MuseControlSystem;

    interface MuseControlSystemOptions {}

    var context: Muse.Context;

    namespace Muse {
        type ProgramManifest = {
            id: string;
            name?: string;
            description?: string;
            version?: string;
            disabled: boolean;
            provider: "groovy" | "javascript" | "python";
            scope?: string;
            script: string;
            envvars?: Record<string, string>;
            files?: Array<string>;
            plugins?: Array<string>;
        };

        type Thing = {
            devices: Devices;
            log: ((msg: any) => void) & Log;
            services: Services;
        };

        type Context = Thing;

        type Devices = {
            get: <T = any>(id: string) => T;
            has: (id: string) => boolean;
            ids: () => Array<string>;
        };

        type Log = {
            level: "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";
            trace: (msg: any) => void;
            debug: (msg: any) => void;
            info: (msg: any) => void;
            warn: (msg: any) => void;
            error: (msg: any) => void;
        };

        type Services = {
            get: <T = any>(name: string) => T;
        };

        type TimelineService = {
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

        type TimelineEventCallback = (event?: TimelineEvent) => void;

        type TimelineEvent = BaseEvent & {
            arguments: {
                data: object;
                sequence: number;
                time: number;
                repetition: number;
            };
        };

        type BaseEvent = {
            path: string;
            id: string;
            arguments: {
                data: object;
            };
            oldValue: object;
            source: object;
        };

        type PlatformService = {
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

        type ICSPDriver = {
            configuration: ICSPConfiguration;
            port: Array<ICSPPort>;
            online: (callback: ICSPOnlineOfflineCallback) => void;
            offline: (callback: ICSPOnlineOfflineCallback) => void;
            isOnline: () => boolean;
            isOffline: () => boolean;
        };

        type ICSPOnlineOfflineCallback = () => void;

        type ICSPConfiguration = {
            device: ISCPDevice;
        };

        type ISCPDevice = {
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

        type ICSPEvent = {
            data: string;
        };

        type ICSPCustomEvent = ICSPEvent & {
            encode: string;
            flag: number;
            value1: number;
            value2: number;
            value3: number;
            id: number;
            type: number;
        };

        type ICSPEventCallback = (event: ICSPEvent) => void;
        type ICSPCustomEventCallback = (event: ICSPCustomEvent) => void;
        type ICSPParameterUpdateCallback<T = any> = (
            event: ParameterUpdate<T>,
        ) => void;

        type ICSPPort = {
            button: Array<Readonly<ICSPButton>>;
            channel: Array<boolean>;
            command: (callback: ICSPEventCallback) => void;
            custom: (callback: ICSPCustomEventCallback) => void;
            level: Array<number>;
            send_command: (data: string) => void;
            send_string: (data: string) => void;
            string: (callback: ICSPEventCallback) => void;
        };

        type ICSPButton = {
            watch: (callback: ICSPParameterUpdateCallback<boolean>) => void;
        };

        type ICSPChannel = {
            watch: (callback: ICSPParameterUpdateCallback<boolean>) => void;
        };

        type ICSPLevel = {
            watch: (callback: ICSPParameterUpdateCallback<number>) => void;
        };

        type Parameter = {
            value: string;
            normalized: number;
            min: number;
            max: number;
            defaultValue: string;
            type: string;
            enums: Array<string>;
        };

        type ParameterUpdate<T = any> = {
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
