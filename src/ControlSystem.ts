export interface ControlSystemOptions {
    context: Muse.Context;
}

class ControlSystem {
    protected readonly console: Muse.Log;
    protected readonly context: Muse.Context;

    constructor({ context }: ControlSystemOptions) {
        this.context = context;
        this.console = context.log;
    }
}

export default ControlSystem;
