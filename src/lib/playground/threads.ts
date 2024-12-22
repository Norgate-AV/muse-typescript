const Thread = Java.type("java.lang.Thread");

export function threads(): void {
    context.log.info("Create an entirely new thread");
    context.log.info("Using the Java API to create a new thread");
    context.log.info("Have it log a message every 3 seconds");

    // It seems that the thread is not being killed when the program is stopped
    // Even if I disable the program, the thread is still running
    // Is there a way to listen for controller events?
    // A way to be notified when the program is about to be stopped or disabled,
    // to clean up resources?
    const thread = new Thread(() => {
        while (true) {
            context.log.info("Hello, from a new thread!");
            Thread.sleep(3000);
        }
    });

    thread.start();
}
