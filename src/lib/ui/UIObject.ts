import { UIGeneralOptions } from "./UIGeneralOptions";
import { UIProgrammingOptions } from "./UIProgrammingOptions";
import { UIStateOptions } from "./UIStateOptions";

export interface UIObjectOptions {
    device: Muse.ICSPDriver;
}

export abstract class UIObject implements Disposable {
    private disposed: boolean = false;
    private registered: boolean = false;

    private readonly device: Muse.ICSPDriver;

    protected general: UIGeneralOptions;
    protected programming: UIProgrammingOptions;
    protected state: UIStateOptions;

    public constructor(options: UIObjectOptions) {
        this.device = options.device;
    }

    [Symbol.dispose](): void {
        this.dispose();
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.disposed = true;
        this.unregister();
    }

    protected register(): void {
        if (this.registered) {
            return;
        }

        this.registered = true;
    }

    protected unregister(): void {
        if (!this.registered) {
            return;
        }

        this.registered = false;
    }

    protected abstract onChangeEvent(event: any): void;

    protected subscribe(): void {
        this.subscribeToChannel();
        this.subscribeToLevel();
    }

    private subscribeToChannel(): void {
        const { device } = this;
        const { port, code } = this.programming.channel;

        if (!port || !code) {
            return;
        }

        device.port[port].button[code].watch((event) =>
            this.onChangeEvent(event),
        );
    }

    private subscribeToLevel(): void {
        const { device } = this;
        const { port, code } = this.programming.level;

        if (!port || !code) {
            return;
        }

        device.port[port].level[code].watch((event) =>
            this.onChangeEvent(event),
        );
    }
}
