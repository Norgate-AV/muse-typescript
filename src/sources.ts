import { TPButton } from "../lib/@types/amx";

export type Source = {
    name: string;
    button?: TPButton;
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
    },
];
