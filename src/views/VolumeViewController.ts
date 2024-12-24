import { VolumeState } from "../state/reducers/volume";
import { Observer } from "../@types/Observer";
import SNAPI from "../lib/constants/SNAPI";
import { VolumeController } from "../controllers/VolumeController";

export class VolumeViewController implements Observer<VolumeState> {
    private panel: Muse.ICSPDriver;
    private port: number;
    private controller: VolumeController;

    public constructor({
        panel,
        port = 1,
        controller,
    }: {
        panel: Muse.ICSPDriver;
        port?: number;
        controller: VolumeController;
    }) {
        this.panel = panel;
        this.port = port;
        this.controller = controller;

        this.subscribe();
    }

    private subscribe(): void {
        const { panel, port, controller } = this;

        panel.online(() => this.panelOnline());
        panel.offline(() => this.panelOffline());

        panel.port[port].button[SNAPI.Channels.VOL_UP].watch((event) =>
            this.buttonEvent(event),
        );
        panel.port[port].button[SNAPI.Channels.VOL_DN].watch((event) =>
            this.buttonEvent(event),
        );
        panel.port[port].button[SNAPI.Channels.VOL_MUTE].watch((event) =>
            this.buttonEvent(event),
        );

        controller.addObserver(this);
    }

    private panelOnline(): void {
        this.panel.port[this.port].channel[1] = this.controller.getMute();
    }

    private panelOffline(): void {
        this.panel.port[this.port].channel[1] = false;
    }

    private buttonEvent(event: any): void {
        if (!event.value) {
            return;
        }

        // this.controller.setVolume(this.controller.getVolume() + 1);
    }

    public update({ level, mute }): void {
        const { panel, port } = this;

        panel.port[port].channel[SNAPI.Channels.VOL_MUTE_FB] = mute;
        panel.port[port].level[SNAPI.Levels.VOL_LVL] = level % 256;
    }
}
