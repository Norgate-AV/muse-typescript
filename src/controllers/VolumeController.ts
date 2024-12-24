import { VolumeState } from "../state/reducers/volume";
import { Observable } from "../@types/Observable";
import { Observer } from "../@types/Observer";

export class VolumeController implements Observable {
    private readonly ramper: Muse.TimelineService;

    private level: number;
    private mute: boolean;

    private observers: Array<Observer<VolumeState>> = [];

    public constructor() {
        this.ramper = context.services.get<Muse.TimelineService>("timeline");
        this.ramper.expired.listen(() => this.ramp());
    }

    public removeObserver(observer: Observer<VolumeState>): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    public addObserver(observer: Observer<VolumeState>): void {
        if (this.observers.includes(observer)) {
            return;
        }

        this.observers.push(observer);
    }

    public notifyObservers(): void {
        this.observers.forEach((o) =>
            o.update({ level: this.level, mute: this.mute }),
        );
    }

    private ramp(): void {
        // const { button } = this.panel.port[2];
        // if (button[Channels.VOLUME.VOL_UP].toString() === "true") {
        //     if (this.level >= 255) {
        //         return;
        //     }
        //     this.level++;
        //     this.update();
        //     return;
        // }
        // if (button[Channels.VOLUME.VOL_DN].toString() === "true") {
        //     if (this.level <= 0) {
        //         return;
        //     }
        //     this.level--;
        //     this.update();
        //     return;
        // }
    }

    private update(): void {
        // this.panel.port[2].level[SNAPI.Levels.VOL_LVL] = this.level;
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
