import { UIPortCodePair } from "./UIPortCodePair";

export abstract class UIObject implements Disposable {
    private name: string;
    private disposed: boolean = false;
    private registered: boolean = false;

    private type: string = "button";
    private id: UIPortCodePair;

    private readonly _device: Muse.ICSPDriver;

    public get Device(): Muse.ICSPDriver {
        return this._device;
    }

    protected constructor(device: Muse.ICSPDriver) {
        this._device = device;
    }

    [Symbol.dispose](): void {
        // invoke the GC
    }

    protected register(): void {
        if (this.registered) {
            return;
        }

        this.Device.port[this.id.port][this.type].watch((event) => {});
    }

    protected abstract onChangeEvent(event: any): void;
}
