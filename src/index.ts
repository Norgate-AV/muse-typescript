// if (global) {
//     global._nashornPolyfill = true;
// }
var console: any = {};
console.debug = print;
console.warn = print;
console.log = print;

import "core-js/es/array/from";
import "core-js/es/array/includes";
import "core-js/es/object/keys";

import { main } from "./main.js";

// Start the program
main();
