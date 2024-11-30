interface TouchPanelOptions {
    context: Muse.Context;
    id: string;
}

class TouchPanel {
    private readonly context: Muse.Context;
    private readonly panel: Muse.ICSPDriver;

    // Events
    public onOnlineStatusChange: Array<Muse.ICSPOnlineOfflineCallback> = [];
    public onChannelChange: Array<Muse.ICSPParameterUpdateCallback<boolean>> =
        [];

    constructor({ context, id }: TouchPanelOptions) {
        this.context = context;

        try {
            this.panel = this.context.devices.get<Muse.ICSPDriver>(id);

            if (!this.panel) {
                throw new Error(`Touch Panel ${id} not found`);
            }

            this.context.log.info(`Touch Panel ${this.panel} initialized`);
            this.context.log.info(`Touch Panel Type: ${typeof this.panel}`);

            this.panel.online(() => {
                this.context.log.info(`Touch Panel ${id} online`);
                this.onOnlineStatusChange.forEach((callback) => callback());
            });
        } catch (error: unknown) {
            this.context.log.error(
                `Failed to initialize Touch Panel: ${error}`,
            );
            throw error;
        }
    }
}

export default TouchPanel;
