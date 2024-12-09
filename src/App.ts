import ControlSystem, { ControlSystemOptions } from "./lib/ControlSystem";
import TouchPanel from "./lib/TouchPanel";
import { DeviceRegistrationStatus } from "./@types/muse/DeviceRegistrationStatus";
import TouchPanelCommand from "./lib/TouchPanelCommand";
import UIManager from "./lib/UIManager";
import { Source, sources } from "./ui/sources";
import UIController from "./lib/UIController";
import { SourceController, UIButton } from "./controllers";
import { TcpClient } from "./TcpClient";

interface AppOptions extends ControlSystemOptions {}

class App extends ControlSystem {
    private panel: TouchPanel;
    private ui: UIManager;
    private sourceController: UIController;

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

        this.sourceController = new SourceController({
            panel: this.panel,
            buttons: [
                new UIButton({
                    programming: {
                        address: { port: 1, code: 31 },
                        channel: { port: 1, code: 31 },
                    },
                }),
                new UIButton({
                    programming: {
                        address: { port: 1, code: 32 },
                        channel: { port: 1, code: 32 },
                    },
                }),
                new UIButton({
                    programming: {
                        address: { port: 1, code: 33 },
                        channel: { port: 1, code: 33 },
                    },
                }),
                new UIButton({
                    programming: {
                        address: { port: 1, code: 34 },
                        channel: { port: 1, code: 34 },
                    },
                }),
            ],
        });

        // this.sourceController.init(this.onSourceSelect);

        const client = new TcpClient({
            host: "192.168.10.47",
            port: 23,
        });

        client.send("get connection\r\n");
        client.send("get device\r\n");
        client.send("get ip\r\n");

        return this;
    }

    private onSourceSelect(source: Source): void {
        this.ui.showPopup({ name: source.popup });
        // SourceRouter.sendSource(source);
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

// function sendSource(source: Source): void {
//     setState((state) => {
//         return {
//             ...state,
//             currentSource: source,
//         };
//     });

//     context.log.info(`Sending ${source.name} to Display`);
// }

// function tpOnlineEventCallback(): void {
//     context.log.info(`Touch Panel Online`);

//     registerSourceButtonEvents(sources);

//     tp.port[1].button[Channels.TOUCH_TO_START].watch(
//         handleTouchToStartButtonEvent,
//     );
//     tp.port[1].button[Channels.SHUT_DOWN].watch(handleShutDownButtonEvent);
//     tp.port[1].button[Channels.SHUT_DOWN_OK].watch(handleShutDownOkButtonEvent);

//     tp.port[2].button[Snapi.VOL_UP].watch(handleVolumeButtonEvent);
//     tp.port[2].button[Snapi.VOL_DN].watch(handleVolumeButtonEvent);
//     tp.port[2].button[Snapi.VOL_MUTE].watch(handleVolumeButtonEvent);

//     tp.port[1].button[Channels.AV_MUTE].watch(handleAVMuteButtonEvent);
//     tp.port[1].button[Channels.RESET_AUDIO].watch(handleAudioResetButtonEvent);

//     registerDocCamButtonEvents();
//     showDocCamButtons(false);

//     tpFeedbackSetup();
//     updateVolume(getState().currentVolume);
//     tpReset();
// }

// function registerDocCamButtonEvents(): void {
//     tp.port[8].button[Snapi.ZOOM_IN].watch(handleDocCamButtonEvent);
//     tp.port[8].button[Snapi.ZOOM_OUT].watch(handleDocCamButtonEvent);
//     tp.port[8].button[Snapi.FOCUS_FAR].watch(handleDocCamButtonEvent);
//     tp.port[8].button[Snapi.FOCUS_NEAR].watch(handleDocCamButtonEvent);
//     tp.port[8].button[Snapi.AUTO_FOCUS].watch(handleDocCamButtonEvent);
// }

// function registerSourceButtonEvents(sources: Array<Source>): void {
//     for (const source of sources) {
//         const { port, code } = source.button.channel;
//         tp.port[port].button[code].watch(handleSelectSourceButtonEvent);
//     }
// }

// function handleDocCamButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
//     if (!event.value) {
//         return;
//     }

//     context.log.info(`Doc Cam Button ${event.id} pressed`);
// }

// function handleTouchToStartButtonEvent(
//     event: Muse.ParameterUpdate<boolean>,
// ): void {
//     if (event.value) {
//         return;
//     }

//     setPage(Pages.Main);
// }

// function tpFeedbackSetup(): void {
//     const tpFeedback = context.services.get<Muse.TimelineService>("timeline");
//     tpFeedback.expired.listen(tpFeedbackHandler);
//     tpFeedback.start([100], false, -1);
// }

// function tpFeedbackHandler(): void {
//     for (const source of sources) {
//         const { port, code } = source.button?.channel;
//         if (!getState().selectedSource) {
//             tp.port[port].channel[code] = false;
//             continue;
//         }
//         tp.port[port].channel[code] =
//             getState().selectedSource.button?.channel.code === code;
//     }

//     tp.port[1].channel[Channels.AV_MUTE] = getState().currentAVMute;
//     tp.port[2].channel[Snapi.VOL_MUTE] = getState().currentMute;
//     // tp.port[2].level[1]
// }

// function handleShutDownButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
//     if (!event.value) {
//         return;
//     }

//     tp.port[1].send_command("@PPN-Dialogs - Shut Down");
// }

// function handleShutDownOkButtonEvent(
//     event: Muse.ParameterUpdate<boolean>,
// ): void {
//     if (!event.value) {
//         return;
//     }

//     shutDown();
// }

// function shutDown(): void {
//     setState((state) => {
//         return {
//             ...state,
//             selectedSource: null,
//             currentSource: null,
//             requiredPopup: Popups.Off,
//         };
//     });

//     setPage(Pages.Logo);
//     audioReset();
// }

// function setPage(page: Page): void {
//     setState((state) => {
//         return {
//             ...state,
//             requiredPage: page,
//         };
//     });

//     tpRefresh();
// }

// function tpReset(): void {
//     const [config, error] = getConfig("./config/config.json");
//     if (error !== null) {
//         context.log.error(`Error reading config: ${error}`);
//     }

//     const programInfo = {
//         name: config ? config.name : "Unknown",
//         version,
//         compiled: new Date().toISOString(),
//         getInfo: function () {
//             return `${this.name} v${this.version} compiled on ${this.compiled}`;
//         },
//     };

//     tp.port[1].send_command(`^TXT-1,0,${programInfo.name}`);
//     tp.port[1].send_command(`^TXT-100,0,${programInfo.getInfo()}`);

//     tp.port[1].send_command("@PPX");
//     tp.port[1].send_command("ADBEEP");

//     tpRefresh();
// }

// function tpRefresh() {
//     const { requiredPage, requiredPopup } = getState();

//     tp.port[1].send_command("@PPF-Dialogs - Audio");
//     tp.port[1].send_command(`PAGE-${requiredPage}`);

//     switch (requiredPage) {
//         case Pages.Main: {
//             tp.port[1].send_command(`@PPN-${requiredPopup};${requiredPage}`);
//             break;
//         }
//         case Pages.Logo: {
//             tp.port[1].send_command(`@PPN-${requiredPopup};${Pages.Main}`);
//             break;
//         }
//     }
// }

/**
 * Event Listeners
 */
// tp.online(tpOnlineEventCallback);

// function handleAVMuteButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
//     if (!event.value) {
//         return;
//     }

//     setState((state) => {
//         return {
//             ...state,
//             currentAVMute: !state.currentAVMute,
//         };
//     });
// }

// function handleAudioResetButtonEvent(
//     event: Muse.ParameterUpdate<boolean>,
// ): void {
//     if (!event.value) {
//         return;
//     }

//     audioReset();
// }

// function updateVolume(volume: number): void {
//     tp.port[2].level[1] = volume;
// }

// function handleVolumeButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
//     switch (parseInt(event.id)) {
//         case Snapi.VOL_UP: {
//             if (!event.value) {
//                 return;
//             }

//             if (getState().currentVolume >= 255) {
//                 return;
//             }

//             setState((state) => {
//                 return {
//                     ...state,
//                     currentMute: false,
//                     currentVolume: (state.currentVolume += 1),
//                 };
//             });

//             updateVolume(getState().currentVolume);

//             break;
//         }
//         case Snapi.VOL_DN: {
//             if (!event.value) {
//                 return;
//             }

//             if (getState().currentVolume <= 0) {
//                 return;
//             }

//             setState((state) => {
//                 return {
//                     ...state,
//                     currentMute: false,
//                     currentVolume: (state.currentVolume -= 1),
//                 };
//             });

//             updateVolume(getState().currentVolume);

//             break;
//         }
//         case Snapi.VOL_MUTE: {
//             if (!event.value) {
//                 return;
//             }

//             setState((state) => {
//                 return {
//                     ...state,
//                     currentMute: !state.currentMute,
//                 };
//             });

//             if (getState().currentMute) {
//                 updateVolume(0);
//             } else {
//                 updateVolume(getState().currentVolume);
//             }

//             break;
//         }
//     }
// }

// function showDocCamButtons(state: boolean) {
//     tp.port[8].send_command(`^SHO-${Snapi.ZOOM_IN},${state ? 1 : 0}`);
//     tp.port[8].send_command(`^SHO-${Snapi.ZOOM_OUT},${state ? 1 : 0}`);
//     tp.port[8].send_command(`^SHO-${Snapi.FOCUS_FAR},${state ? 1 : 0}`);
//     tp.port[8].send_command(`^SHO-${Snapi.FOCUS_NEAR},${state ? 1 : 0}`);
//     tp.port[8].send_command(`^SHO-${Snapi.AUTO_FOCUS},${state ? 1 : 0}`);
// }

// function audioReset() {
//     setState((state) => {
//         return {
//             ...state,
//             currentVolume: 127,
//             currentMute: false,
//         };
//     });

//     updateVolume(getState().currentVolume);
// }
