if (!globalThis.console) {
    // @ts-ignore
    globalThis.console = {};

    // @ts-ignore
    globalThis.console.log = context.log;

    // @ts-ignore
    globalThis.console.log.level = context.log.level;

    // @ts-ignore
    globalThis.console.trace = context.log.trace;

    // @ts-ignore
    globalThis.console.debug = context.log.debug;

    // @ts-ignore
    globalThis.console.info = context.log.info;

    // @ts-ignore
    globalThis.console.warn = context.log.warn;

    // @ts-ignore
    globalThis.console.error = context.log.error;
}

if (!globalThis.process) {
    // @ts-ignore
    globalThis.process = {};

    // @ts-ignore
    globalThis.process.env = {};
}

// Polyfills
import "core-js/es/array";
import "core-js/es/array-buffer";
import "core-js/es/date";
import "core-js/es/error";
import "core-js/es/function";
import "core-js/es/get-iterator";
import "core-js/es/global-this";
import "core-js/es/iterator";
import "core-js/es/json";
import "core-js/es/map";
import "core-js/es/math";
import "core-js/es/number";
import "core-js/es/object/assign";
import "core-js/es/object/create";
import "core-js/es/object/entries";
import "core-js/es/object/keys";
import "core-js/es/object/values";
import "core-js/es/promise";
import "core-js/es/reflect";
import "core-js/es/regexp";
import "core-js/es/set";
import "core-js/es/string";
import "core-js/es/typed-array";
import "core-js/es/weak-map";
import "core-js/es/weak-set";
