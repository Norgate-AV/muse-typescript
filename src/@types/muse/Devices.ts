export type Devices = {
    get: <T = any>(name: string) => T;
    has: (name: string) => boolean;
    ids: () => Array<string>;
};
