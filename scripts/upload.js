#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Check required environment variables
const { HOST, USER } = process.env;

if (!HOST) {
    console.error("Error: HOST not found in .env file");
    process.exit(1);
}

if (!USER) {
    console.error("Error: USER not found in .env file");
    process.exit(1);
}

// Read program.json file
const programFilePath = path.join(__dirname, "../program.json");

if (!fs.existsSync(programFilePath)) {
    console.error("Error: program.json file not found");
    process.exit(1);
}

const programFile = JSON.parse(fs.readFileSync(programFilePath, "utf8"));

const { name, files } = programFile;

if (!name) {
    console.error("Error: name not found in program.json");
    process.exit(1);
}

if (!files || files.length === 0) {
    console.error("Error: files not found in program.json");
    process.exit(1);
}

// Transfer files
console.log(`Transferring files to ${HOST}...`);
files.forEach((file) => {
    const resolvedPath = path.resolve(file);
    execSync(`scp -r ${resolvedPath} ${USER}@${HOST}:/mojo/program/${name}/`);
});

// Restart program
console.log("\nRestarting program...");
execSync(`ssh ${USER}@${HOST} "program:restart ${name}"`);

console.log("Upload script executed successfully.");
