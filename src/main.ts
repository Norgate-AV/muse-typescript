import App from "./App";

export function main() {
    const app = new App().init();

    if (!app) {
        throw new Error("App failed to initialize");
    }

    console.log("Program Started");
}
