import ControlSystem, { ControlSystemOptions } from "./lib/ControlSystem";
import TouchPanel from "./lib/TouchPanel";
import type { GlobalState as State } from "./store";
import { DeviceRegistrationStatus } from "./@types/muse/DeviceRegistrationStatus";
import TouchPanelCommand from "./lib/TouchPanelCommand";

interface AppOptions extends ControlSystemOptions {}

class App extends ControlSystem {
    private panel: TouchPanel;
    private state: State;

    constructor(options: AppOptions = {}) {
        super(options);
    }

    public init(): this {
        this.panel = new TouchPanel({ id: "AMX-10001" });
        this.panel.onOnlineEvent.push(() => this.handlePanelOnlineEvent());
        this.panel.onButtonEvent.push(this.handlePanelButtonEvent);
        if (this.panel.register() !== DeviceRegistrationStatus.Success) {
            context.log.error(
                `Failed to register Touch Panel ${this.panel.id}`,
            );
        }

        return this;
    }

    private handlePanelOnlineEvent(): void {
        this.panel.sendCommand(TouchPanelCommand.closeAllPopups());
        this.panel.sendCommand(TouchPanelCommand.doubleBeep());
    }

    private handlePanelButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
        context.log.info(`Button Event: ${event.path}`);
        context.log.info(`Button Old Value: ${event.oldValue}`);
        context.log.info(`Button New Value: ${event.value}`);

        const pattern = /^port\/1\/button\/(3(1|2|3|4))$/gm;
        // const pattern = new RegExp(
        //     "^\\/port\\/1\\/button\\/(3(1|2|3|4))",
        //     "gm",
        // );
        const match = event.path.match(pattern);

        if (!match) {
            context.log.info(
                `Button Event: ${event.path} does not match pattern`,
            );

            return;
        }

        context.log.info(`Source Button Event: ${match[1]}, ${match[0]}`);

        // if (event.path.match(/^\/port\/1\/button\/3(1|2|3|4)$/gm)) {
        //     // Source Buttons
        //     if (!event.value) {
        //         return;
        //     }

        //     context.log.info(`Source Button Event: ${event.path}`);
        // }
    }
}

export default App;
