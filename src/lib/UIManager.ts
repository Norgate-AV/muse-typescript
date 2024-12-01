import type TouchPanel from "./TouchPanel";
import TouchPanelCommand from "./TouchPanelCommand";

interface UIManagerOptions {
    panel: TouchPanel;
}

class Page {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class UIManager {
    private readonly panel: TouchPanel;
    private pages: Record<string, Page> = {};
    private page: string;

    constructor({ panel }: UIManagerOptions) {
        this.panel = panel;
        this.panel.onOnlineEvent.push(() => this.handlePanelOnlineEvent());
        context.log.info("UI Manager Initialized");
    }

    private handlePanelOnlineEvent(): void {
        this.reset().refresh();
    }

    public setPage(page: string): this {
        this.page = page;
        return this.refresh();
    }

    private refresh(): this {
        const { page, panel } = this;

        panel.sendCommand(TouchPanelCommand.page(page));

        return this;
    }

    private reset(): this {
        context.log.info("Resetting UI");
        return this;
    }
}

export default UIManager;
