import { Thing } from "./src/@types/muse";

declare global {
    var Java: any;
    var context: Thing;

    var console: typeof context.log;
}
