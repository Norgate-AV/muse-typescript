import ControlSystem, { ControlSystemOptions } from "./lib/ControlSystem";
import TouchPanel from "./lib/TouchPanel";
import { DeviceRegistrationStatus } from "./@types/muse/DeviceRegistrationStatus";
import TouchPanelCommand from "./lib/TouchPanelCommand";
import UIManager from "./lib/UIManager";
import { sources } from "./ui/sources";

interface AppOptions extends ControlSystemOptions {}

class App extends ControlSystem {
    private panel: TouchPanel;
    private ui: UIManager;

    constructor(options: AppOptions = {}) {
        super(options);
    }

    public init(): this {
        this.panel = new TouchPanel({ id: "AMX-10001" });
        this.panel.onOnlineEvent.push(() => this.handlePanelOnlineEvent());
        this.panel.onButtonEvent.push((event) =>
            this.handlePanelButtonEvent(event),
        );

        if (this.panel.register() !== DeviceRegistrationStatus.Success) {
            context.log.error(
                `Failed to register Touch Panel ${this.panel.id}`,
            );
        }

        this.ui = new UIManager({
            panel: this.panel,
            initialPage: { name: "Logo" },
        });

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

        const pattern = /^\w+\/\d\/button\/(\d+)$/g;
        const matches = pattern.exec(event.path);

        if (!matches) {
            context.log.info(
                `Button Event: ${event.path} does not match pattern`,
            );

            return;
        }

        const channel = parseInt(matches[1]);

        switch (channel) {
            // Touch To Start
            case 1: {
                if (!event.value) {
                    return;
                }

                this.ui.showPage("Main");
                break;
            }

            // Power Button
            case 2: {
                if (!event.value) {
                    return;
                }

                this.ui.showPopup({ name: "Dialogs - Shut Down" });
                break;
            }

            // Source Buttons
            case 31:
            case 32:
            case 33:
            case 34: {
                if (!event.value) {
                    return;
                }

                const [source] = sources.filter(
                    (source) => source.button.channel.code === channel,
                );

                this.ui.showPopup({ name: `${source.popup}` });

                for (const source of sources) {
                    const { code } = source.button?.channel;

                    // if (!getState().selectedSource) {
                    //     tp.port[port].channel[code] = false;
                    //     continue;
                    // }

                    this.panel.channel[code] = channel === code;
                }

                break;
            }
        }

        // context.log.info(`Source Button Event: ${match[1]}, ${match[0]}`);

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
