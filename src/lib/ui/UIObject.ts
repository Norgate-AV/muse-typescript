import { UIPortCodePair } from "./UIPortCodePair";

export abstract class UIObject implements Disposable {
    private name: string;
    private disposed: boolean = false;
    private registered: boolean = false;

    private type: string = "button";
    private id: UIPortCodePair;

    private readonly _device: Muse.ICSPDriver | null = null;

    public get Device(): Muse.ICSPDriver {
        return this._device;
    }

    protected constructor(device: Muse.ICSPDriver) {
        this._device = device;
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
}
