import { ParameterUpdate } from "./ParameterUpdate";

export type ICSPDriver = {
    configuration: ICSPConfiguration;
    port: Array<ICSPPort>;
    online: (callback: ICSPOnlineOfflineCallback) => void;
    offline: (callback: ICSPOnlineOfflineCallback) => void;
    isOnline: () => boolean;
    isOffline: () => boolean;
};

type ICSPOnlineOfflineCallback = () => void;

export type ICSPConfiguration = {
    device: ISCPDevice;
};

export type ISCPDevice = {
    classname: string;
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
export type ICSPParameterUpdateCallback = (
    event: ParameterUpdate<boolean>
) => void;

export type ICSPPort = {
    button: Array<Readonly<ICSPButton>>;
    channel: Array<ICSPChannel>;
    command: (callback: ICSPEventCallback) => void;
    custom: (callback: ICSPCustomEventCallback) => void;
    level: Array<ICSPLevel>;
    send_command: (data: string) => void;
    send_string: (data: string) => void;
    string: (callback: ICSPEventCallback) => void;
};

export type ICSPButton = {
    watch: (callback: ICSPParameterUpdateCallback) => void;
};

export type ICSPChannel = boolean;
export type ICSPLevel = number;
