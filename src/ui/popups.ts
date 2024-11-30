import { ValueOf } from "../@types";

export type Popup = ValueOf<typeof Popups>;

export const Popups = {
    Off: "Sources - Off",
    Laptop: "Sources - Laptop",
    PC: "Sources - PC",
    Visualiser: "Sources - Doc Cam",
    BYOD: "Sources - Wireless",
} as const;
