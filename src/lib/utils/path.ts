function exists(path: string): boolean {
    return new java.io.File(path).exists();
}

function join(first: string, ...paths: string[]): string {
    return java.nio.file.Paths.get(first, ...paths).toString();
}

function resolve(...paths: string[]): string {
    return java.nio.file.Paths.get.apply(null, paths).toString();
}

function basename(path: string): string {
    return java.nio.file.Paths.get(path).getFileName().toString();
}

function dirname(path: string): string {
    return java.nio.file.Paths.get(path).getParent().toString();
}

function extname(path: string): string {
    return java.nio.file.Paths.get(path).getFileName().toString();
}

function isAbsolute(path: string): boolean {
    return java.nio.file.Paths.get(path).isAbsolute();
}

function normalize(path: string): string {
    return java.nio.file.Paths.get(path).normalize().toString();
}

function relative(from: string, to: string): string {
    return java.nio.file.Paths.get(from)
        .relativize(java.nio.file.Paths.get(to))
        .toString();
}

function parse(path: string): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
} {
    const pathObj = java.nio.file.Paths.get(path);

    return {
        root: pathObj.getRoot().toString(),
        dir: pathObj.getParent().toString(),
        base: pathObj.getFileName().toString(),
        ext: pathObj.getFileName().toString(),
        name: pathObj.getFileName().toString(),
    };
}

export default {
    exists,
    join,
    resolve,
    basename,
    dirname,
    extname,
    isAbsolute,
    normalize,
    relative,
    parse,
};
