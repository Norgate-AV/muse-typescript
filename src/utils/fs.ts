function readDir(dir: string): string[] {
    const Files = Java.type("java.nio.file.Files");
    const Paths = Java.type("java.nio.file.Paths");

    const entities = Files.list(Paths.get(dir));
    const list: string[] = [];

    entities.forEach((entity) => {
        list.push(entity.toString());
    });

    return list;
}

function readFile(file: string): [string | null, Error | null] {
    const Files = Java.type("java.nio.file.Files");
    const Paths = Java.type("java.nio.file.Paths");

    try {
        const data = Files.readAllLines(Paths.get(file));
        return [data, null];
    } catch (error: any) {
        return ["", new Error(error)];
    }
}

function writeFile(file: string, data: string): Error | null {
    const FileWriter = Java.type("java.io.FileWriter");

    try {
        const writer = new FileWriter(file);
        writer.write(data);
        writer.close();
    } catch (error: any) {
        return new Error(error);
    }

    return null;
}

function createFile(file: string): Error | null {
    const File = Java.type("java.io.File");

    try {
        const fileObj = new File(file);
        if (fileObj.createNewFile()) {
            return null;
        }
    } catch (error: any) {
        return new Error(error);
    }

    return null;
}

function getHomeDir(): string {
    const System = Java.type("java.lang.System");
    return System.getProperty("user.home");
}

function getCwd(): string {
    const System = Java.type("java.lang.System");
    return System.getProperty("user.dir");
}

export default {
    createFile,
    getCwd,
    getHomeDir,
    readDir,
    readFile,
    writeFile,
};
