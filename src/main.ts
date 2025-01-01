import App from "./App";
import store from "./state/store";

export async function main() {
    try {
        const app = new App({ store });
        await app.init();
    } catch (error: any) {
        panic(
            `App initialization failed: ${
                error.message ? error.message : error
            }`,
        );
    }

    console.log("App Loaded");
}
