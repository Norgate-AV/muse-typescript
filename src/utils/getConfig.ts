import fs from "./fs";

export type Config = {
    name?: string;
};

export function getConfig(path: string): [Config | null, Error | null] {
    const String = Java.type("java.lang.String");

    const [data, error] = fs.readFile(
        `${fs.getProgramDir()}/muse-typescript/${path}`,
    );

    if (error !== null) {
        return [null, error];
    }

    return [JSON.parse(data), null];
}
