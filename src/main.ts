import App from "./App";
import store from "./state/store";

function panic(message: string): never {
    throw new Error(message);
}

export function main() {
    try {
        const app = new App({ store }).init();

        if (!app) {
            throw new Error("App failed to initialize");
        }
    } catch (error: any) {
        panic(error.message);
    }

    console.log("Program Started");
}
