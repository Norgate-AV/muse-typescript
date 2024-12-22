import { Timeline } from "../services/Timeline";

const Thread = Java.type("java.lang.Thread");

export function timelines(): void {
    const log = context.log;

    log.info("Create a new timeline");
    log.info("Have it pause every 10 repetitions and restart after 5 seconds");
    log.info("Use the Java Thread API to sleep the main thread");

    const timeline = new Timeline({
        service: context.services.get("timeline"),
    });

    timeline.onExpired.push((event: Muse.TimelineEvent) => {
        log.info(`Timer ID: ${event.id}`);
        log.info(`Timer Path: ${event.path}`);
        log.info(`Timer Sequence: ${event.arguments.sequence}`);
        log.info(`Timer Time: ${event.arguments.time}`);
        log.info(`Timer Repetition: ${event.arguments.repetition}`);

        if (event.arguments.repetition % 10 === 0) {
            timeline.pause();
            Thread.sleep(5000);
            timeline.restart();
        }
    });

    timeline.create();
}
