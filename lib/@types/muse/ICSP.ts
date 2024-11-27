export interface ICSP {
    configuration: Readonly<ICSPConfiguration>;
    port:
}

export interface ICSPConfiguration {
    device: Readonly<ISCPDevice>;
}

export interface ISCPDevice {
    classname: string;
    container: string;
    description: string;
    descriptorlocation: string;
    devicestate: string;
    family: string;
    guid: string;
    location: string;
    manufacturer: string;
    model: string;
    name: string;
    protocolversion: string;
    serialnumber: string;
    softwareversion: string;
    venue: string;
    version: string;
}

export interface ISCPPort {

}
