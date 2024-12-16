import {
    MuseControlSystem,
    MuseControlSystemOptions,
} from "./@types/muse/MuseControlSystem";
import { TouchPanelCommand, getConfig } from "./lib";
import { Channels, Sources } from "./ui";
import { version } from "../program.json";

const PAGE_LOGO = 0;
const PAGE_MAIN = 1;

const PAGE_NAMES = ["Logo", "Main"];

const POPUP_NAMES = [
    "Sources - Off",
    "Sources - Laptop",
    "Sources - Doc Cam",
    "Sources - PC",
    "Sources - Wireless",
];

interface AppOptions extends MuseControlSystemOptions {}

class App extends MuseControlSystem {
    private panel: Muse.ICSPDriver;
    private feedback: Muse.TimelineService;

    private selectedSource: number = null;
    private currentSource: number = null;

    private requiredPage: number = PAGE_LOGO;
    private requiredPopup: number = null;

    private switcher: any = {};
    private display: any = {};

    private currentAvMute: boolean = false;

    private currentMute: boolean = false;
    private currentVolume: number = 127;
    private volumeRamper: Muse.TimelineService;

    public constructor(options: AppOptions = {}) {
        super(options);
    }

    public init(): this {
        this.panel = context.devices.get<Muse.ICSPDriver>("AMX-10001");
        this.panel.online(() => this.onPanelOnlineEvent());

        this.feedback = context.services.get<Muse.TimelineService>("timeline");
        this.feedback.expired.listen(() => this.onFeedbackEvent());
        this.feedback.start([100], false, -1);

        this.volumeRamper =
            context.services.get<Muse.TimelineService>("timeline");
        this.volumeRamper.expired.listen(() => this.rampVolume());

        return this;
    }

    private onFeedbackEvent(): void {
        Object.values(Channels.SOURCE).forEach((channel, index) => {
            this.panel.port[1].channel[channel] =
                this.selectedSource === index + 1;
        });

        this.panel.port[1].channel[Channels.AV_MUTE] = this.currentAvMute;
        this.panel.port[2].channel[Channels.VOLUME.VOL_MUTE] = this.currentMute;
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

        for (const source of Sources) {
            this.panel.port[1].button[source.channel].watch((event) => {
                if (!event.value) {
                    return;
                }

                const source =
                    Sources.findIndex(
                        (source) => source.channel === parseInt(event.id),
                    ) + 1;

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

        this.panel.port[2].button[Channels.VOLUME.VOL_UP].watch((event) =>
            this.volumeButtonEvent(event),
        );
        this.panel.port[2].button[Channels.VOLUME.VOL_DN].watch((event) =>
            this.volumeButtonEvent(event),
        );
        this.panel.port[2].button[Channels.VOLUME.VOL_MUTE].watch((event) =>
            this.volumeButtonEvent(event),
        );

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

        this.updateVolume(this.currentVolume);
        this.panelRefresh();
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
                            name: POPUP_NAMES[0],
                        }),
                    );

                    break;
                }

                this.panel.port[1].send_command(
                    TouchPanelCommand.popupShow({
                        name: POPUP_NAMES[this.requiredPopup],
                    }),
                );

                break;
            }
        }
    }

    private rampVolume(): void {
        const { button } = this.panel.port[2];

        if (button[Channels.VOLUME.VOL_UP].toString() === "true") {
            if (this.currentVolume >= 255) {
                return;
            }

            this.currentVolume++;
            this.updateVolume(this.currentVolume);
            return;
        }

        if (button[Channels.VOLUME.VOL_DN].toString() === "true") {
            if (this.currentVolume <= 0) {
                return;
            }

            this.currentVolume--;
            this.updateVolume(this.currentVolume);
            return;
        }
    }

    private volumeButtonEvent(event: Muse.ParameterUpdate<boolean>): void {
        switch (parseInt(event.id)) {
            case Channels.VOLUME.VOL_UP:
            case Channels.VOLUME.VOL_DN: {
                if (!event.value) {
                    this.volumeRamper.stop();
                    return;
                }

                this.volumeRamper.start([50], false, -1);

                break;
            }
            case Channels.VOLUME.VOL_MUTE: {
                if (!event.value) {
                    return;
                }

                this.currentMute = !this.currentMute;

                if (this.currentMute) {
                    this.updateVolume(0);
                } else {
                    this.updateVolume(this.currentVolume);
                }

                break;
            }
        }
    }

    private selectSource(source: number): void {
        this.selectedSource = source;
        this.requiredPopup = source;

        this.sendSource(source);

        this.panelRefresh();
    }

    private sendSource(source: number): void {
        this.currentSource = source;
        print(`Sending ${source} to Display`);

        this.switcher.input = Sources[source - 1].switcherInput;
        this.display.input = Sources[source - 1].displayInput;
    }

    private shutDown(): void {
        this.currentSource = 0;
        this.requiredPopup = 0;
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
        this.currentMute = false;
        this.currentVolume = 127;

        this.updateVolume(this.currentVolume);
    }

    private updateVolume(volume: number): void {
        this.panel.port[2].level[1] = volume;
    }
}

export default App;
