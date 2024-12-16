if (!globalThis.console) {
    // @ts-ignore
    globalThis.console = {};

    // @ts-ignore
    globalThis.console.log = context.log;

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

import "core-js/es/array/find";
import "core-js/es/array/find-index";
import "core-js/es/array/from";
import "core-js/es/array/includes";
import "core-js/es/array-buffer";
import "core-js/es/date";
import "core-js/es/global-this";
import "core-js/es/iterator";
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
import "core-js/es/string/includes";
import "core-js/es/string/pad-end";
import "core-js/es/string/pad-start";
import "core-js/es/typed-array/uint8-array";
import "core-js/es/typed-array/uint8-clamped-array";
import "core-js/es/typed-array/uint16-array";
import "core-js/es/typed-array/uint32-array";
import "core-js/es/typed-array/int8-array";
import "core-js/es/typed-array/int16-array";
import "core-js/es/typed-array/int32-array";
import "core-js/es/typed-array/float32-array";
import "core-js/es/typed-array/float64-array";
import "core-js/es/weak-map";
import "core-js/es/weak-set";

import { main } from "./main";

// Start the program
main();
