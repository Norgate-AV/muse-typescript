import { name } from "../program.json";
import { arrays } from "./arrays";
import { sources } from "./sources";
import { timelines } from "./timelines";
import { threads } from "./threads";
import { strings } from "./strings";
// const System = Java.type("java.lang.System");
import { Enova } from "./Enova";
import { Switcher } from "../lib/@types";

// const platform = context.services.get("platform");
// const diagnostics = context.services.get("diagnostics");
// const netlinx = context.services.get("netlinxClient");
// const session = context.services.get("session");
// const smtp = context.services.get("smtp");
// const timeline = context.services.get("timeline");

// const services = [platform, diagnostics, netlinx, session, smtp, timeline];

function main() {
    context.log.info(`Hello, ${name}!`);

    arrays();
    sources();
    // timelines();
    // threads();
    strings();

    // for (const service of services) {
    //     context.log.info(JSON.stringify(service));
    // }

    // System.out.println("Goodbye from Java land!");

    const enova: Switcher = new Enova();

    enova.switch(1, 2, 1);
}

// function hello(args: Array<number>) {}

context.log.info("Processor Online");
main();
