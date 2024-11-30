export function setInterval(
    callback: (...args: any) => void,
    interval: number = 1,
    ...args: any
): Muse.TimelineService {
    // const Thread = Java.type("java.lang.Thread");
    // const thread = new Thread(() => {
    //     while (true) {
    //         context.log.info(`Waiting ${interval}ms`);
    //         Thread.sleep(interval);
    //         callback();
    //     }
    // });
    // thread.start();

    const timeline = context.services.get<Muse.TimelineService>("timeline");

    timeline.expired.listen(() => {
        callback(...args);
    });

    timeline.start([interval], false, -1);

    return timeline;
}
