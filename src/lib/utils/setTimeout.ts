export function setTimeout(callback: () => void, timeout: number): void {
    const Thread = Java.type("java.lang.Thread");

    const thread = new Thread(() => {
        context.log.info(`Waiting ${timeout}ms`);
        Thread.sleep(timeout);
        callback();
    }).start();
}
