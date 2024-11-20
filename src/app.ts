import { name } from "../program.json";
import { Timer } from "../lib/@types";

const sources = [
    {
        name: "PC",
        matrixInput: 1,
        matrixOutputs: [1, 2],
        displayInput: "HDMI",
    },
    {
        name: "PS4",
        matrixInput: 2,
        matrixOutputs: [1, 2],
        displayInput: "HDMI",
    },
    {
        name: "Xbox",
        matrixInput: 3,
        matrixOutputs: [1, 2],
        displayInput: "HDMI",
    },
    {
        name: "Switch",
        matrixInput: 4,
        matrixOutputs: [1, 2],
        displayInput: "HDMI",
    },
];

function main() {
    context.log.info(`Hello, ${name}!`);

    const array = [1, 2, 3, 4, 5];
    context.log.info(`Array: ${array}`);

    for (const value of array) {
        context.log.info(`Value: ${value}`);
    }

    array.push(6);
    context.log.info(`Array: [${array}]`);

    for (const source of sources) {
        context.log.info(`Source: ${source.name}`);
        context.log.info(`Matrix Input: ${source.matrixInput}`);
        context.log.info(`Matrix Outputs: [${source.matrixOutputs}]`);
        context.log.info(`Display Input: ${source.displayInput}`);
    }

    context.log.info(
        `Sources: ${sources.map((source) => source.name).join(", ")}`
    );

    context.log.info(`Sources: ${JSON.stringify(sources)}`);

    const timer = new Timer();
    timer.start(() => {
        context.log.info("Tick");
    });
}

context.log.info("Processor Online");
main();
