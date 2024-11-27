export interface Devices {
    get: (name: string) => any;
    has: (name: string) => boolean;
    ids: () => Array<string>;
}
