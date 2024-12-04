import TouchPanel from "./TouchPanel";

export interface UIControllerOptions {
    panel: TouchPanel;
}

export abstract class UIController {
    public panel: TouchPanel;

    constructor({ panel }: UIControllerOptions) {
        this.panel = panel;
    }

    public abstract init(): void;
}

export default UIController;
