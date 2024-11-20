export interface Devices {
    get: (name: string) => string;
    has: (name: string) => boolean;
    ids: () => Array<string>;
}
