interface TouchPanelOptions {
    // context: Muse.Context;
    id?: string;
    port?: number;
}

enum DeviceRegistrationStatus {
    Success,
    Failure,
}

class TouchPanel {
    // private context: Muse.Context;
    private readonly _id: string;
    private readonly port: number;

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

    constructor({ id = "AMX-10001", port = 1 }: TouchPanelOptions) {
        // this.context = context;
        this._id = id;
        this.port = port;
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
            context.log.info(`Registering listener for button ${button}`);
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
}

export default TouchPanel;
