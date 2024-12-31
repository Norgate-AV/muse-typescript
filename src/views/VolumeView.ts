import SNAPI from "../lib/constants/SNAPI";
import { UIButton } from "../lib/ui/UIButton";
import { UIViewController } from "../lib/ui/UIViewController";

export class VolumeView extends UIViewController {
    private port: number;

    private volumeUpButton: UIButton;
    private volumeDownButton: UIButton;
    private muteButton: UIButton;
    private volumeLevel: UIButton;

    public constructor({
        panel,
        port = 1,
    }: {
        panel: Muse.ICSP.Driver;
        port?: number;
    }) {
        super({ panel });
        this.port = port;

        this.subscribe();

        this.volumeUpButton = new UIButton({ device: this.panel });
    }

    private updateVolumeLevel(level: number): void {}

    private subscribe(): void {
        const { panel, port } = this;

        // panel.online(() => this.panelOnline());
        // panel.offline(() => this.panelOffline());

        // panel.port[port].button[SNAPI.Channels.VOL_UP].watch((event) =>
        //     this.buttonEvent(event),
        // );
        // panel.port[port].button[SNAPI.Channels.VOL_DN].watch((event) =>
        //     this.buttonEvent(event),
        // );
        // panel.port[port].button[SNAPI.Channels.VOL_MUTE].watch((event) =>
        //     this.buttonEvent(event),
        // );

        // controller.addObserver(this);
    }

    private panelOnline(): void {
        // this.panel.port[this.port].channel[1] = this.controller.getMute();
    }

    // private panelOffline(): void {
    //     this.panel.port[this.port].channel[1] = false;
    // }

    // private buttonEvent(event: any): void {
    //     if (!event.value) {
    //         return;
    //     }

    //     // this.controller.setVolume(this.controller.getVolume() + 1);
    // }

    // public update({ level, mute }): void {
    //     const { panel, port } = this;

    //     panel.port[port].channel[SNAPI.Channels.VOL_MUTE_FB] = mute;
    //     panel.port[port].level[SNAPI.Levels.VOL_LVL] = level % 256;
    // }
}
