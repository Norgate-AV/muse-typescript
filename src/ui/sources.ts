import { Channels } from "./Channels";
import { uuid } from "../lib/utils";

export const Sources = [
    {
        id: uuid(),
        name: "Laptop",
        channel: Channels.SOURCE.LAPTOP,
        popup: "Sources - Laptops",
        switcherInput: 1,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "Doc Cam",
        channel: Channels.SOURCE.DOC_CAM,
        popup: "Sources - Doc Cam",
        switcherInput: 2,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "PC",
        channel: Channels.SOURCE.PC,
        popup: "Sources - PC",
        switcherInput: 3,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "BYOD",
        channel: Channels.SOURCE.BYOD,
        popup: "Sources - Wireless",
        switcherInput: 4,
        displayInput: "HDMI,1",
    },
];
