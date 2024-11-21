import { Timeline } from "./Timeline";

export class Timer {
    private readonly timeline: Timeline = context.services.get("timeline");
    private readonly interval: number;

    constructor(interval: number = 1000) {
        this.interval = interval;
    }

    public start(callback: Function): void {
        this.timeline.expired.listen(callback);
        this.timeline.expired.listen(this.log);
        this.timeline.start([this.interval], false, -1);
    }

    public stop(): void {
        this.timeline.stop();
    }

    public pause(): void {
        this.timeline.pause();
    }

    public reset(): void {
        this.timeline.reset();
    }

    public log(event: any): void {
        context.log.info(`Timeline: ${this.timeline}`);
        context.log.info(`Timeline Type: ${typeof this.timeline}`);
        context.log.info(`Event: ${event}`);
    }
}
