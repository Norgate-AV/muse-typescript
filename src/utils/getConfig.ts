import fs from "./fs";

export type Config = {
    name?: string;
};

export function getConfig(): [Config | null, Error | null] {
    const String = Java.type("java.lang.String");

    const [data, error] = fs.readFile(
        "/mnt/data/mojo/mojo/program/muse-typescript/config.json"
    );

    if (error !== null) {
        return [null, error];
    }

    return [JSON.parse(String.join("\n", data)), null];
}
