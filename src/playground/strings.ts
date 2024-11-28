export function strings(): void {
    const log = context.log;

    const string = "Hello, World!";
    log.info(`String: ${string}`);

    // Use the charAt method
    log.info(`Character at index 0 should be 'H': ${string.charAt(0)}`);

    // Use the charCodeAt method
    log.info(`Character code at index 0 should be 72: ${string.charCodeAt(0)}`);

    // Use the concat method
    log.info(
        `Concatenate 'Hello, ' and 'World!': ${"Hello, ".concat("World!")}`
    );

    // Use the includes method
    // log.info(`Does the string include 'World!': ${string.includes("World!")}`);

    // Use the indexOf method
    log.info(`Index of 'World!': ${string.indexOf("World!")}`);

    // Use the lastIndexOf method
    log.info(`Last index of 'o': ${string.lastIndexOf("o")}`);

    // Use the match method
    log.info(`Match 'World!': ${string.match("World!")}`);

    // Use the repeat method
    log.info(`Repeat 'Hello, World!' 3 times: ${string.repeat(3)}`);

    // Use the replace method
    log.info(
        `Replace 'World!' with 'Mars!': ${string.replace("World!", "Mars!")}`
    );

    // Use the search method
    log.info(`Search for 'World!': ${string.search("World!")}`);

    // Use the slice method
    log.info(`Slice 'World!': ${string.slice(7)}`);

    // Use the split method
    log.info(`Split 'Hello, World!': ${string.split(",")}`);

    // Use the startsWith method
    log.info(`Starts with 'Hello': ${string.startsWith("Hello")}`);

    // Use the substr method
    log.info(`Substring starting at index 7: ${string.substr(7)}`);

    // Use the substring method
    log.info(`Substring from index 7 to 12: ${string.substring(7, 12)}`);

    // Use the toLowerCase method
    log.info(`Lowercase: ${string.toLowerCase()}`);

    // Use the toUpperCase method
    log.info(`Uppercase: ${string.toUpperCase()}`);

    // Use the trim method
    log.info(`Trim: ${"  Hello, World!  ".trim()}`);

    // Use the valueOf method
    log.info(`Value of: ${string.valueOf()}`);

    // Use the padStart method
    // log.info(`Pad start with 'Hi, ': ${string.padStart(9, "Hi, ")}`);

    // Use the padEnd method
    // log.info(`Pad end with '!' ${string.padEnd(13, "!")}`);

    // Use the localeCompare method
    log.info(
        `Locale compare 'Hello, World!': ${string.localeCompare(
            "Hello, World!"
        )}`
    );

    // Use the normalize method
    // log.info(`Normalize: ${string.normalize()}`);

    // Use the search method
    log.info(`Search for 'World!': ${string.search("World!")}`);
}
