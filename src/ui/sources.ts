import { TPButton } from "../@types";
import { Popup, Popups } from "./popups";

export type Source = {
    name: string;
    button?: TPButton;
    popup?: Popup;
};

export const sources: Array<Source> = [
    {
        name: "PC",
        button: {
            address: {
                port: 1,
                code: 33,
            },
            channel: {
                port: 1,
                code: 33,
            },
        },
        popup: Popups.PC,
    },
    {
        name: "Laptops",
        button: {
            address: {
                port: 1,
                code: 31,
            },
            channel: {
                port: 1,
                code: 31,
            },
        },
        popup: Popups.Laptop,
    },
    {
        name: "Visualiser",
        button: {
            address: {
                port: 1,
                code: 32,
            },
            channel: {
                port: 1,
                code: 32,
            },
        },
        popup: Popups.Visualiser,
    },
    {
        name: "BYOD",
        button: {
            address: {
                port: 1,
                code: 34,
            },
            channel: {
                port: 1,
                code: 34,
            },
        },
        popup: Popups.BYOD,
    },
];
