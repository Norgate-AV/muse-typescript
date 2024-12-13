// import "core-js/es/array/find";
// import "core-js/es/array/find-index";
// import "core-js/es/array/from";
// import "core-js/es/array/includes";
// import "core-js/es/array-buffer";
// import "core-js/es/date";
// import "core-js/es/global-this";
// import "core-js/es/iterator";
// import "core-js/es/map";
// import "core-js/es/math";
// import "core-js/es/number";
// import "core-js/es/object/assign";
// import "core-js/es/object/create";
// import "core-js/es/object/entries";
// import "core-js/es/object/keys";
// import "core-js/es/object/values";
// import "core-js/es/promise";
// import "core-js/es/reflect";
// import "core-js/es/regexp";
// import "core-js/es/set";
// import "core-js/es/string/includes";
// import "core-js/es/string/pad-end";
// import "core-js/es/string/pad-start";
// import "core-js/es/typed-array/uint8-array";
// import "core-js/es/typed-array/uint8-clamped-array";
// import "core-js/es/typed-array/uint16-array";
// import "core-js/es/typed-array/uint32-array";
// import "core-js/es/typed-array/int8-array";
// import "core-js/es/typed-array/int16-array";
// import "core-js/es/typed-array/int32-array";
// import "core-js/es/typed-array/float32-array";
// import "core-js/es/typed-array/float64-array";
// import "core-js/es/weak-map";
// import "core-js/es/weak-set";
// import "core-js/es/symbol";
// import "lodash";

// import { main } from "./main";

// if (!globalThis.console) {
//     // @ts-ignore
//     globalThis.console = {};

//     // @ts-ignore
//     globalThis.console.level = context.log.level;

//     // @ts-ignore
//     globalThis.console.log = context.log.info;

//     // @ts-ignore
//     globalThis.console.error = context.log.error;

//     // @ts-ignore
//     globalThis.console.debug = context.log.debug;

//     // @ts-ignore
//     globalThis.console.info = context.log.info;

//     // @ts-ignore
//     globalThis.console.warn = context.log.warning;

//     // @ts-ignore
//     globalThis.console.trace = context.log.trace;

//     // @ts-ignore
//     // globalThis.console.dir = function (obj: any) {
//     //     for (const key in obj) {
//     //         if (typeof obj[key] !== "object") {
//     //             continue;
//     //         }

//     //         console.log(`${key}`);
//     //     }
//     // };
// }

// @ts-ignore
// console.level = "TRACE";
// console.log("Starting program...");
// console.info("Program started");
// console.debug("Debugging program...");
// console.warn("Warning program...");
// console.error("Error program...");
// console.trace("Tracing program...");

// context.log.level = "TRACE";
// context.log("Starting program...");
// context.log.trace("Starting program...");
// context.log.debug("Starting program...");
// context.log.info("Starting program...");
// context.log.warning("Starting program...");
// context.log.error("Starting program...");

// Start the program
// main();

// console.log("Hello, world!");
// console.dir({ a: 1, b: 2, c: 3 });
// console.log(process.env);
// // console.log(context);
// // console.dir(context);
// console.dir(process);

import { java } from "java";

const System = java.import("java.lang.System");
System.out.printlnSync("Hello, World!");
