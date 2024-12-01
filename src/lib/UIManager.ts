import { UIPage } from "./UIPage";
import { UIPopup } from "./UIPopup";
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
    private popup: UIPopup;

    constructor({ panel, initialPage }: UIManagerOptions) {
        this.panel = panel;
        this.panel.onOnlineEvent.push(() => this.handlePanelOnlineEvent());
        this.page = initialPage;

        this.reset().refresh();
    }

    private handlePanelOnlineEvent(): void {
        this.reset().refresh();
    }

    public showPage(name: string): this {
        this.page.name = name;
        return this.refresh();
    }

    public showPopup({
        name,
        page = this.page.name,
    }: {
        name: string;
        page?: string;
    }): this {
        this.popup = { name, page: this.pages[page] };
        return this.refresh();
    }

    private refresh(): this {
        const { page, panel, popup } = this;

        panel.sendCommand(
            TouchPanelCommand.popupHide({ name: "Dialogs - Shut Down" }),
        );
        panel.sendCommand(TouchPanelCommand.page(page.name));

        if (!popup) {
            return this;
        }

        panel.sendCommand(TouchPanelCommand.popupShow({ name: popup.name }));

        return this;
    }

    private reset(): this {
        return this;
    }
}

export default UIManager;
