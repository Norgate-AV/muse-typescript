import ControlSystem, { ControlSystemOptions } from "./lib/ControlSystem";
import TouchPanelCommand from "./lib/TouchPanelCommand";
import { UIButton } from "./lib/UIButton";
import Channels from "./Channels";
import { LogoPage } from "./LogoPage";

const SOURCE_LAPTOP = 1;
const SOURCE_DOC_CAM = 2;
const SOURCE_PC = 3;
const SOURCE_BLURAY = 4;

const PAGE_LOGO = 0;
const PAGE_MAIN = 1;

const PAGE_NAMES = ["Logo", "Main"];

interface AppOptions extends ControlSystemOptions {}

class App extends ControlSystem {
    private panel: Muse.ICSPDriver;
    private feedback: Muse.TimelineService;

    private currentSource: number = 0;

    private requiredPage: number = PAGE_LOGO;
    private requiredPopup: number = 0;

    constructor(options: AppOptions = {}) {
        super(options);
    }

    public init(): this {
        this.panel = context.devices.get<Muse.ICSPDriver>("AMX-10001");
        this.panel.online(() => this.onPanelOnlineEvent());

        this.feedback = context.services.get<Muse.TimelineService>("timeline");
        this.feedback.expired.listen(() => this.onFeedbackEvent());
        this.feedback.start([100], false, -1);

        return this;
    }

    private onFeedbackEvent(): void {
        Object.values(Channels.SOURCE).forEach((channel, index) => {
            this.panel.port[1].channel[channel] =
                this.currentSource === index + 1;
        });
    }

    private onPanelOnlineEvent(): void {
        this.panel.port[1].button[Channels.TOUCH_TO_START].watch(() => {
            this.requiredPage = PAGE_MAIN;
            this.panelRefresh();
        });

        for (const button of Object.values(Channels.SOURCE)) {
            this.panel.port[1].button[button].watch((event) =>
                this.onSourceButtonEvent(event),
            );
        }

        const logoPage = new LogoPage();

        this.panelReset();
    }

    private panelReset(): void {
        this.panel.port[1].send_command(TouchPanelCommand.closeAllPopups());
        this.panel.port[1].send_command(TouchPanelCommand.doubleBeep());

        this.panelRefresh();
    }

    private panelRefresh(): void {
        // this.panel.port[1].send_command(
        //     TouchPanelCommand.popupShow({
        //         name: `Pages - ${PAGE_NAMES[this.requiredPage - 1]}`,
        //     }),
        // );

        this.panel.port[1].send_command(
            TouchPanelCommand.page(PAGE_NAMES[this.requiredPage]),
        );
    }

    private onSourceButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
        if (!event.value) {
            return;
        }

        const source =
            Object.values(Channels.SOURCE).findIndex(
                (channel) => channel === parseInt(event.id),
            ) + 1;

        this.currentSource = source;

        switch (source) {
            case SOURCE_LAPTOP: {
                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({ name: "Sources - Laptops" }),
                );

                break;
            }
            case SOURCE_DOC_CAM: {
                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({ name: "Sources - Doc Cam" }),
                );

                break;
            }
            case SOURCE_PC: {
                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({ name: "Sources - PC" }),
                );

                break;
            }
            case SOURCE_BLURAY: {
                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({ name: "Sources - Blu-Ray" }),
                );

                break;
            }
        }
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
