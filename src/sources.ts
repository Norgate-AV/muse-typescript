export const items = [
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

export function sources(): void {
    for (const item of items) {
        context.log.info(`Source: ${item.name}`);
        context.log.info(`Matrix Input: ${item.matrixInput}`);
        context.log.info(`Matrix Outputs: [${item.matrixOutputs}]`);
        context.log.info(`Display Input: ${item.displayInput}`);
    }
}
