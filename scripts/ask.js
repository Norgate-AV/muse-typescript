const readline = require("readline");
const { exec } = require("child_process");
const path = require("path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Transfer now? (Y/n): ", (answer) => {
    if (answer.toLowerCase() !== "y" && answer !== "") {
        rl.close();
        process.exit(0);
    }

    console.log();

    const scriptDir = path.dirname(__filename);
    const uploadScript = path.join(scriptDir, "upload.js");

    exec(`node ${uploadScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing upload script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(stdout);
    });

    rl.close();
});
