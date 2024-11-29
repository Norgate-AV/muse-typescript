export class Timeline {
    private readonly service: Muse.TimelineService;
    private readonly intervals: Array<number>;
    private readonly relative: boolean;

    // -1 means repeat forever
    // 0 means don't repeat. Only fire once
    // 1 means repeat once
    // 2 means repeat twice
    // etc
    private readonly repeat: number;

    // Events
    public onExpired: Array<Muse.TimelineEventCallback> = [];

    constructor({
        service,
        intervals = [1000],
        relative = false,
        repeat = -1,
    }: {
        service: Muse.TimelineService;
        intervals?: Array<number>;
        relative?: boolean;
        repeat?: number;
    }) {
        this.service = service;
        this.intervals = intervals;
        this.relative = relative;
        this.repeat = repeat;

        this.service.expired.listen((event) => {
            this.onExpired.forEach((cb) => cb(event));
        });
    }

    public create(): this {
        this.service.start(this.intervals, this.relative, this.repeat);
        return this;
    }

    public kill(): this {
        this.service.stop();
        return this;
    }

    public pause(): this {
        this.service.pause();
        return this;
    }

    public restart(): this {
        this.service.restart();
        return this;
    }
}
