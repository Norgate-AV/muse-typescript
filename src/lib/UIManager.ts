import { UIPage } from "./UIPage";
import type TouchPanel from "./TouchPanel";
import TouchPanelCommand from "./TouchPanelCommand";

interface UIManagerOptions {
    panel: TouchPanel;
    initialPage: UIPage;
}

class UIManager {
    private readonly panel: TouchPanel;
    private pages: Record<string, UIPage> = {};
    private page: UIPage;

    constructor({ panel, initialPage }: UIManagerOptions) {
        this.panel = panel;
        this.panel.onOnlineEvent.push(() => this.handlePanelOnlineEvent());
        this.page = initialPage;

        this.reset().refresh();
    }

    private handlePanelOnlineEvent(): void {
        this.reset().refresh();
    }

    public setPage(page: string): this {
        this.page.name = page;
        return this.refresh();
    }

    private refresh(): this {
        const { page, panel } = this;

        panel.sendCommand(TouchPanelCommand.page(page.name));

        return this;
    }

    private reset(): this {
        context.log.info("Resetting UI");
        return this;
    }
}

export default UIManager;
