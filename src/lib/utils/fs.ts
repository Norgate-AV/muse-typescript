function readDir(dir: string): string[] {
    const Files = Java.type<typeof java.nio.file.Files>("java.nio.file.Files");
    const Paths = Java.type<typeof java.nio.file.Paths>("java.nio.file.Paths");

    const entities = Files.list(Paths.get(dir));
    const list: string[] = [];

    entities.forEach((entity) => {
        list.push(entity.toString());
    });

    return list;
}

function readFile(file: string): [string | null, Error | null] {
    const Files = Java.type<typeof java.nio.file.Files>("java.nio.file.Files");
    const Paths = Java.type<typeof java.nio.file.Paths>("java.nio.file.Paths");

    try {
        const data = Files.readAllLines(Paths.get(file));

        let result = "";
        for (const line in data) {
            result += data[line];
        }

        return [result, null];
    } catch (error: any) {
        return ["", new Error(error)];
    }
}

function writeFile(file: string, data: string): Error | null {
    const FileWriter =
        Java.type<typeof java.io.FileWriter>("java.io.FileWriter");

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
    const File = Java.type<typeof java.io.File>("java.io.File");

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
    const System = Java.type<typeof java.lang.System>("java.lang.System");
    return System.getProperty("user.home");
}

function getProgramDir(): string {
    const System = Java.type<typeof java.lang.System>("java.lang.System");
    return `${System.getProperty("karaf.mojo")}/program`;
}

function getCwd(): string {
    const System = Java.type<typeof java.lang.System>("java.lang.System");
    return System.getProperty("user.dir");
}

export default {
    createFile,
    getCwd,
    getHomeDir,
    getProgramDir,
    readDir,
    readFile,
    writeFile,
};
