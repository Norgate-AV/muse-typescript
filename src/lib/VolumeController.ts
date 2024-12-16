import { App } from "../App";
import { Observable } from "./Observable";
import { Snapi } from ".";
import { Channels } from "../ui";

export class VolumeController implements Observable {
    private readonly panel: Muse.ICSPDriver;
    private readonly ramper: Muse.TimelineService;

    private readonly app: App;

    private level: number;
    private mute: boolean;

    private observers: Array<any> = [];

    public constructor(app: App) {
        this.app = app;

        this.ramper = context.services.get<Muse.TimelineService>("timeline");
        this.ramper.expired.listen(() => this.ramp());
    }

    public removeObserver(observer: any): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    public addObserver(observer: any): void {
        this.observers.push(observer);
    }

    private ramp(): void {
        const { button } = this.panel.port[2];

        if (button[Channels.VOLUME.VOL_UP].toString() === "true") {
            if (this.level >= 255) {
                return;
            }

            this.level++;
            this.update();
            return;
        }

        if (button[Channels.VOLUME.VOL_DN].toString() === "true") {
            if (this.level <= 0) {
                return;
            }

            this.level--;
            this.update();
            return;
        }
    }

    private update(): void {
        this.panel.port[2].level[Snapi.Levels.VOL_LVL] = this.level;
    }

    public setLevel(level: number): void {
        this.level = level % 256;
        this.update();
    }

    public getLevel(): number {
        return this.level;
    }

    public levelUp(): void {
        this.setLevel(++this.level);
    }

    public levelDown(): void {
        this.setLevel(--this.level);
    }

    public setMute(mute: boolean): void {
        this.mute = mute;
    }

    public getMute(): boolean {
        return this.mute;
    }

    public toggleMute(): boolean {
        this.mute = !this.mute;
        return this.getMute();
    }
}
