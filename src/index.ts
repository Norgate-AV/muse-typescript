import { main } from "./main";

const foo = context.devices.get("foo");
print(foo === null);
print(typeof foo);

const wrapped = Object(foo);
print(wrapped);
print(typeof wrapped);

if (foo === null || foo === undefined) {
    print("foo is null or undefined");
} else {
    print("foo is truthy");
}

if (wrapped === null || wrapped === undefined) {
    print("wrapped is null or undefined");
} else {
    print("wrapped is truthy");
}

// Start the program
main();
