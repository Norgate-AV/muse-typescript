import {
    MuseControlSystem,
    MuseControlSystemOptions,
} from "./@types/muse/MuseControlSystem";
import { TouchPanelCommand, getConfig } from "./lib";
import { Channels, sources } from "./ui";
import type { Source } from "./models/Source";
import { version } from "../program.json";
import { VolumeController } from "./controllers/VolumeController";
import { VolumeViewController } from "./views/VolumeViewController";
// import store from "./store";

const PAGE_LOGO = 0;
const PAGE_MAIN = 1;

const PAGE_NAMES = ["Logo", "Main"];

interface AppOptions extends MuseControlSystemOptions {}

export class App extends MuseControlSystem {
    private panel: Muse.ICSPDriver;
    private feedback: Muse.TimelineService;

    private selectedSource: Source = null;
    private currentSource: Source = null;

    private requiredPage: number = PAGE_LOGO;
    private requiredPopup: string = null;

    private switcher: any = {};
    private display: any = {};

    private currentAvMute: boolean = false;

    // private store = store;

    // private currentMute: boolean = false;
    // private currentVolume: number = 127;
    // private volumeRamper: Muse.TimelineService;
    private volumeController: VolumeController;
    private volumeViewController: VolumeViewController;

    public constructor(options: AppOptions = {}) {
        super(options);
    }

    public override init(): this {
        this.panel = context.devices.get<Muse.ICSPDriver>("AMX-10001");
        this.panel.online(() => this.onPanelOnlineEvent());

        this.feedback = context.services.get<Muse.TimelineService>("timeline");
        this.feedback.expired.listen(() => this.onFeedbackEvent());
        this.feedback.start([100], false, -1);

        // this.volumeRamper =
        //     context.services.get<Muse.TimelineService>("timeline");
        // this.volumeRamper.expired.listen(() => this.rampVolume());

        this.volumeController = new VolumeController();
        this.volumeViewController = new VolumeViewController({
            panel: this.panel,
            controller: this.volumeController,
        });

        return this;
    }

    private onFeedbackEvent(): void {
        sources.forEach((source) => {
            this.panel.port[1].channel[source.channel] =
                this.selectedSource === source;
        });

        this.panel.port[1].channel[Channels.AV_MUTE] = this.currentAvMute;
        // this.panel.port[2].channel[Channels.VOLUME.VOL_MUTE] = this.currentMute;
    }

    private onPanelOnlineEvent(): void {
        this.panel.port[1].button[Channels.TOUCH_TO_START].watch((event) => {
            if (!event.value) {
                return;
            }

            this.requiredPage = PAGE_MAIN;
            this.panelRefresh();
        });

        this.panel.port[1].button[Channels.SHUT_DOWN].watch((event) => {
            if (!event.value) {
                return;
            }

            this.panel.port[1].send_command(
                TouchPanelCommand.popupShow({ name: "Dialogs - Shut Down" }),
            );
        });

        this.panel.port[1].button[Channels.SHUT_DOWN_OK].watch((event) => {
            if (!event.value) {
                return;
            }

            this.shutDown();
        });

        for (const source of sources) {
            this.panel.port[1].button[source.channel].watch((event) => {
                if (!event.value) {
                    return;
                }

                const source = sources.find(
                    (source) => source.channel === parseInt(event.id),
                );

                this.selectSource(source);
            });
        }

        this.panel.port[1].button[Channels.AV_MUTE].watch((event) => {
            if (!event.value) {
                return;
            }

            this.setAvMute(!this.currentAvMute);
        });

        this.panel.port[1].button[Channels.RESET_AUDIO].watch((event) => {
            if (!event.value) {
                return;
            }

            this.audioReset();
        });

        // this.panel.port[2].button[Channels.VOLUME.VOL_UP].watch((event) =>
        //     this.volumeButtonEvent(event),
        // );
        // this.panel.port[2].button[Channels.VOLUME.VOL_DN].watch((event) =>
        //     this.volumeButtonEvent(event),
        // );
        // this.panel.port[2].button[Channels.VOLUME.VOL_MUTE].watch((event) =>
        //     this.volumeButtonEvent(event),
        // );

        const [config, error] = getConfig("./config/config.json");
        if (error !== null) {
            console.error(`Error reading config: ${error}`);
        }

        const programInfo = {
            name: config ? config.name : "Unknown",
            version,
            compiled: new Date().toISOString(),
            getInfo: function () {
                return `${this.name} v${this.version} compiled on ${this.compiled}`;
            },
        };

        this.panel.port[1].send_command(
            TouchPanelCommand.text({ address: 1, text: programInfo.name }),
        );
        this.panel.port[1].send_command(`^TXT-100,0,${programInfo.getInfo()}`);
        this.panel.port[1].send_command(
            TouchPanelCommand.text({
                address: 100,
                text: programInfo.getInfo(),
            }),
        );

        this.panelReset();
    }

    private panelReset(): void {
        this.panel.port[1].send_command(TouchPanelCommand.closeAllPopups());
        this.panel.port[1].send_command(TouchPanelCommand.doubleBeep());

        // this.updateVolume(this.currentVolume);
        this.panelRefresh();
        // console.log(
        //     `Current state: ${JSON.stringify(store.getState(), null, 4)}`,
        // );
        this.store.dispatch({ type: "SET_VOLUME", payload: 127 });
        // console.log(
        //     `Current state: ${JSON.stringify(store.getState(), null, 4)}`,
        // );
    }

    private panelRefresh(): void {
        this.panel.port[1].send_command(
            TouchPanelCommand.page(PAGE_NAMES[this.requiredPage]),
        );

        switch (this.requiredPage) {
            case PAGE_MAIN: {
                if (this.requiredPopup === null) {
                    this.panel.port[1].send_command(
                        TouchPanelCommand.popupShow({
                            name: "Sources - Off",
                        }),
                    );

                    break;
                }

                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({
                        name: this.requiredPopup,
                    }),
                );

                break;
            }
        }
    }

    // private rampVolume(): void {
    //     const { button } = this.panel.port[2];

    //     if (button[Channels.VOLUME.VOL_UP].toString() === "true") {
    //         if (this.currentVolume >= 255) {
    //             return;
    //         }

    //         this.currentVolume++;
    //         this.updateVolume(this.currentVolume);
    //         return;
    //     }

    //     if (button[Channels.VOLUME.VOL_DN].toString() === "true") {
    //         if (this.currentVolume <= 0) {
    //             return;
    //         }

    //         this.currentVolume--;
    //         this.updateVolume(this.currentVolume);
    //         return;
    //     }
    // }

    // private volumeButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
    //     switch (parseInt(event.id)) {
    //         case Channels.VOLUME.VOL_UP:
    //         case Channels.VOLUME.VOL_DN: {
    //             if (!event.value) {
    //                 this.volumeRamper.stop();
    //                 return;
    //             }

    //             this.volumeRamper.start([50], false, -1);

    //             break;
    //         }
    //         case Channels.VOLUME.VOL_MUTE: {
    //             if (!event.value) {
    //                 return;
    //             }

    //             this.currentMute = !this.currentMute;

    //             if (this.currentMute) {
    //                 this.updateVolume(0);
    //             } else {
    //                 this.updateVolume(this.currentVolume);
    //             }

    //             break;
    //         }
    //     }
    // }

    private selectSource(source: Source): void {
        this.selectedSource = source;
        this.requiredPopup = source.popup;

        console.log(`Selected ${source.id} - ${source.name}`);

        this.sendSource(source);

        this.panelRefresh();
    }

    private sendSource(source: Source): void {
        this.currentSource = source;
        console.log(`Sending ${source.name} to Display`);

        this.switcher.input = source.switcherInput;
        this.display.input = source.displayInput;
    }

    private shutDown(): void {
        this.currentSource = null;
        this.requiredPopup = null;
        this.requiredPage = PAGE_LOGO;

        this.switcher.input = 0;
        this.display.powerOff();

        this.audioReset();
        this.panelRefresh();
    }

    private setAvMute(state: boolean): void {
        this.currentAvMute = state;
    }

    private audioReset(): void {
        // this.currentMute = false;
        // this.currentVolume = 127;
        // this.updateVolume(this.currentVolume);
    }

    // private updateVolume(volume: number): void {
    //     this.panel.port[2].level[1] = volume;
    // }
}

export default App;
