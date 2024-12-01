export interface ControlSystemOptions {}

class ControlSystem {
    public timelineService =
        context.services.get<Muse.TimelineService>("timeline");

    constructor(options: ControlSystemOptions) {}
}

export default ControlSystem;
