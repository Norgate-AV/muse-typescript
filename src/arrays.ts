export function arrays(): void {
    const log = context.log;

    const fruits = ["apples", "bananas", "cherries", "dates"];
    log.info(`Array: [${fruits}]`);

    // Directly index into the fruits
    log.info(`Index 0 should be "apples": ${fruits[0]}`);

    // Use the forEach method
    fruits.forEach((fruit, index) => {
        log.info("List of fruits:");
        log.info(`${index}:${fruit}`);
    });

    // Use the map method
    const newArray = fruits.map((fruit) => fruit.toUpperCase());
    log.info("Map over the fruits and convert each fruit to uppercase:");
    log.info(newArray);

    // Use the filter method
    const filteredArray = fruits.filter((fruit) => fruit.startsWith("b"));
    log.info("Filter the fruits for fruits that start with 'b':");
    log.info(filteredArray);

    // Use the reduce method
    const reducedValue = fruits.reduce(
        (accumulator, fruit) => accumulator + fruit,
        ""
    );

    log.info("Reduce the fruits to a single string:");
    log.info(reducedValue);

    // Use the some method
    const someValue = fruits.some((fruit) => fruit.startsWith("b"));
    log.info("Check if some fruits start with 'b':");
    log.info(someValue);

    // Use the every method
    const everyValue = fruits.every((fruit) => fruit.startsWith("b"));
    log.info("Check if every fruit starts with 'b':");
    log.info(everyValue);

    // Use the find method
    // const foundValue = fruits.find((fruit) => fruit.startsWith("a"));
    // log.info("Find the first fruit that starts with 'a':");
    // log.info(foundValue);

    // Use the findIndex method
    // const foundIndex = fruits.findIndex((fruit) => fruit.startsWith("a"));
    // log.info("Find the index of the first fruit that starts with 'a':");
    // log.info(foundIndex);

    // Use the indexOf method
    const indexOfValue = fruits.indexOf("bananas");
    log.info("Find the index of 'bananas':");
    log.info(indexOfValue);

    // Use the lastIndexOf method
    const lastIndexOfValue = fruits.lastIndexOf("bananas");
    log.info("Find the last index of 'bananas':");
    log.info(lastIndexOfValue);

    // Push some new items onto the fruits
    log.info("Push 'elderberries' and 'figs' onto the fruits:");
    fruits.push("elderberries", "figs");

    log.info("List fruits using a for...of loop:");
    for (const fruit of fruits) {
        log.info(fruit);
    }
}
