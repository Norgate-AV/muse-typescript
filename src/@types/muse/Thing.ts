import { Devices } from "./Devices";
import { Log } from "./Log";
import { Services } from "./Services";

export type Thing = {
    devices: Devices;
    log: ((...args: any) => void) & Log;
    services: Services;
};