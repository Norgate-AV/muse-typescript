export class Timer {
    private readonly timeline = context.services.get("timeline");
    private readonly interval: number;

    constructor(interval: number = 1000) {
        this.interval = interval;
    }

    public start(callback: Function): void {
        this.timeline.expired.listen(callback);
        this.timeline.start([this.interval], false, -1);
    }

    public stop(): void {
        this.timeline.stop();
    }

    public log(): void {
        context.log.info(`Timeline: ${this.timeline}`);
        context.log.info(`Timeline Type: ${typeof this.timeline}`);
    }
}
