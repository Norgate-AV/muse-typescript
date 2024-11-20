import program from "../program.json";

const system = Java.type("java.lang.System");

system.out.println("Hello from the Java world!");

const log = context.log;
log.level = 1;

context.log("Hello from the TypeScript world!");

log.info("Hello from the TypeScript world!");

log.info("Processor Online");
log.info(`Starting: ${program.name.toUpperCase()}`);

log.info("Hello, World!");
log.info(context);

let dvTP: any;

function func(event: object, next: (prefix: string) => void) {
    log.info(dvTP);
    next("we are");
}

func({}, (prefix) => {
    log.info(`${prefix} done`);
});

log.info(context.devices.ids());
log.info("YoYo");

const source = [1, 2, 3, 4, 5];

const result = source.map((value) => value * 2);
result.push(6);
log.info(result);
