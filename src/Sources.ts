import { uuid } from "./lib/utils/uuid";

export const Sources = [
    {
        id: uuid(),
        name: "Laptops",
        popup: "Sources - Laptops",
        switcherInput: 1,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "Doc Cam",
        popup: "Sources - Doc Cam",
        switcherInput: 2,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "PC",
        popup: "Sources - PC",
        switcherInput: 3,
        displayInput: "HDMI,1",
    },
    {
        id: uuid(),
        name: "BYOD",
        popup: "Sources - Wireless",
        switcherInput: 4,
        displayInput: "HDMI,1",
    },
];
