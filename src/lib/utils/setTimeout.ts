export function setTimeout(callback: () => void, timeout: number): void {
    const Thread = Java.type<typeof java.lang.Thread>("java.lang.Thread");

    const thread = new Thread(() => {
        context.log.info(`Waiting ${timeout}ms`);
        Thread.sleep(timeout);
        callback();
    });

    thread.start();
}
