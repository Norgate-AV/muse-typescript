import App from "./App";
// import store from "./store";

function panic(message: string) {
    throw new Error(message);
}

export function main() {
    try {
        const app = new App().init();

        if (!app) {
            throw new Error("App failed to initialize");
        }
    } catch (error: any) {
        panic(error.message);
    }

    console.log("Program Started");
}
