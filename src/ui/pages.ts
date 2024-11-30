import { ValueOf } from "../@types";

export type Page = ValueOf<typeof Pages>;

export const Pages = {
    Logo: "Logo",
    Main: "Main",
} as const;
