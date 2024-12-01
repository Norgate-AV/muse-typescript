import App from "./App";

function main() {
    const app = new App().init();

    if (!app) {
        throw new Error("App failed to initialize");
    }

    context.log.info("Program Started");
}

// Start the program
main();
