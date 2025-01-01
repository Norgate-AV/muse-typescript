import { main } from "./main";

// Start the program
(async () => {
    try {
        await main();
    } catch (error: any) {
        panic(
            `main execution failed: ${error.message ? error.message : error}`,
        );
    }

    console.log("Program Started");
})();
