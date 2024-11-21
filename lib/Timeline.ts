import * as Muse from "./@types/muse";

export class Timeline {
    private readonly timeline: Muse.Timeline = context.services.get("timeline");
    private readonly intervals: Array<number>;
    private readonly relative: boolean;

    // -1 means repeat forever
    // 0 means don't repeat. Only fire once
    // 1 means repeat once
    // 2 means repeat twice
    // etc
    private readonly repeat: number;

    constructor({
        intervals = [1000],
        relative = false,
        repeat = -1,
    }: {
        intervals?: Array<number>;
        relative?: boolean;
        repeat?: number;
    } = {}) {
        this.intervals = intervals;
        this.relative = relative;
        this.repeat = repeat;
    }

    public create(callback: Muse.TimelineEventCallback): void {
        this.timeline.expired.listen(callback);
        this.timeline.start(this.intervals, this.relative, this.repeat);
    }

    public kill(): void {
        this.timeline.stop();
    }

    public pause(): void {
        this.timeline.pause();
    }

    public restart(): void {
        this.timeline.restart();
    }
}
