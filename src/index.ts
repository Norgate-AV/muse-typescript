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

// import { main } from "./main";

// // Start the program
// main();

const tl1 = context.services.get("timeline");
const tl2 = context.services.get("timeline");

// print(tl1);
// print(`tl1: ${tl1.toString()}`);
// print(`tl2: ${tl2.toString()}`);

// for (const key in tl1) {
//     print(key);
// }

// for (const key of Object.keys(tl2)) {
//     print(key);
// }

tl1.start([1000], false, -1);

tl1.expired.listen(() => {
    print(`tl1 expired: ${new Date().toISOString()}`);
});

tl1.start([2000], false, -1);
