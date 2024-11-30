import ControlSystem, { ControlSystemOptions } from "./lib/ControlSystem";
import TouchPanel from "./lib/TouchPanel";
import type { GlobalState as State } from "./store";

interface AppOptions extends ControlSystemOptions {
    // context: Muse.Context;
}

enum DeviceRegistrationStatus {
    Success,
    Failure,
}

class App extends ControlSystem {
    private panel: TouchPanel;
    private state: State;

    constructor(options: AppOptions = {}) {
        super(options);
    }

    public init(): this {
        context.log.info("App Initializing");

        this.panel = new TouchPanel({ id: "AMX-10001" });
        this.panel.onButtonEvent.push(this.handleButtonEvent);
        if (this.panel.register() !== DeviceRegistrationStatus.Success) {
            context.log.error(
                `Failed to register Touch Panel ${this.panel.id}`,
            );
        }

        context.log.info(`Touch Panel ${this.panel.id} registered`);

        return this;
    }

    private handleButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
        context.log.info(`Button Event: ${event.path}`);
        context.log.info(`Button Old Value: ${event.oldValue}`);
        context.log.info(`Button New Value: ${event.value}`);
    }
}

export default App;
