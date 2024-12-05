// import App from "./App";
global._nashornPolyfill = true;
import path from "./lib/utils/path";
import "core-js";

function main() {
    // const app = new App().init();

    // if (!app) {
    //     throw new Error("App failed to initialize");
    // }

    context.log.info("Program Started");

    const test = "/mnt/data/mojo/mojo/program/muse-typescript/program.json";

    print(path.exists(test));
    print(path.basename(test));
    print(path.dirname(test));
    print(path.extname(test));
    print(path.isAbsolute(test));
    print(path.normalize(test));
    print(path.relative("/mnt/data/mojo/mojo/program", test));
    print(path.parse(test));

    Array.prototype.includes = function (element: any) {
        return this.indexOf(element) !== -1;
    };

    const arr = [1, 2, 3, 4, 5];
    print(arr.includes(3));
}

// Start the program
main();
