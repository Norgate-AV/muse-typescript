const Runtime = Java.type("java.lang.Runtime");
const Process = Java.type("java.lang.Process");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");

print("Starting the Node.js process...");

const command =
    "/usr/bin/node /mnt/data/mojo/mojo/program/muse-typescript/dist/main.js";

const process = Runtime.getRuntime().exec(command);
const inputStream = process.getInputStream();
const errorStream = process.getErrorStream();

readStream(inputStream);
readStream(errorStream);
process.waitFor();

function readStream(stream) {
    const bufferedReader = new BufferedReader(new InputStreamReader(stream));
    let line = bufferedReader.readLine();

    while (line != null) {
        print(line);
        line = bufferedReader.readLine();
    }

    bufferedReader.close();
    stream.close();
}
