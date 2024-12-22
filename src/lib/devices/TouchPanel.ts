import { DeviceRegistrationStatus } from "../../@types/muse/DeviceRegistrationStatus";

interface TouchPanelOptions {
    id?: string;
    port?: number;
}

class TouchPanel {
    private readonly _id: string;
    private readonly _port: number;

    private device: Muse.ICSPDriver;

    // Events
    public onOnlineEvent: Array<Muse.ICSPOnlineOfflineCallback> = [];
    public onOfflineEvent: Array<Muse.ICSPOnlineOfflineCallback> = [];
    public onButtonEvent: Array<Muse.ICSPParameterUpdateCallback<boolean>> = [];
    public onChannelEvent: Array<Muse.ICSPParameterUpdateCallback<boolean>> =
        [];
    public onLevelEvent: Array<Muse.ICSPParameterUpdateCallback<number>> = [];

    // Getters
    public get id(): string {
        return this._id;
    }

    public get port(): number {
        return this._port;
    }

    public get channel(): Array<boolean> {
        return this.device.port[this.port].channel;
    }

    constructor({ id = "AMX-10001", port = 1 }: TouchPanelOptions) {
        this._id = id;
        this._port = port;
    }

    public register(): DeviceRegistrationStatus {
        try {
            this.device = context.devices.get<Muse.ICSPDriver>(this.id);
            this.device.online(() => this.onlineEvent());
            this.device.offline(() => this.offlineEvent());
        } catch (error: unknown) {
            context.log.error(`Failed to register Touch Panel: ${error}`);
            return DeviceRegistrationStatus.Failure;
        }

        return DeviceRegistrationStatus.Success;
    }

    private setupListeners(): this {
        const { device, port } = this;
        const { button: buttons } = device.port[port];

        for (const button in buttons) {
            buttons[parseInt(button)].watch((event) => this.buttonEvent(event));
        }

        return this;
    }

    private buttonEvent(event: Muse.ParameterUpdate<boolean>): void {
        this.onButtonEvent.forEach((callback) => callback(event));
    }

    private onlineEvent(): void {
        context.log.info(`Touch Panel ${this.id} Online`);
        this.onOnlineEvent.forEach((callback) => callback());
        this.setupListeners();
    }

    private offlineEvent(): void {
        context.log.info(`Touch Panel ${this.id} Offline`);
        this.onOfflineEvent.forEach((callback) => callback());
    }

    public sendCommand(command: string): void {
        this.device.port[this.port].send_command(command);
    }
}

export default TouchPanel;
