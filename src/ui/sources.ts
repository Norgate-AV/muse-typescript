import { Channels } from "./Channels";
import { Source } from "../models/Source";

export const sources: Array<Source> = [
    new Source({
        name: "Laptop",
        channel: Channels.SOURCE.LAPTOP,
        popup: "Sources - Laptop",
        switcherInput: 1,
        displayInput: "HDMI,1",
    }),
    new Source({
        name: "Doc Cam",
        channel: Channels.SOURCE.DOC_CAM,
        popup: "Sources - Doc Cam",
        switcherInput: 2,
        displayInput: "HDMI,1",
    }),
    new Source({
        name: "PC",
        channel: Channels.SOURCE.PC,
        popup: "Sources - PC",
        switcherInput: 3,
        displayInput: "HDMI,1",
    }),
    new Source({
        name: "BYOD",
        channel: Channels.SOURCE.BYOD,
        popup: "Sources - Wireless",
        switcherInput: 4,
        displayInput: "HDMI,1",
    }),
];
