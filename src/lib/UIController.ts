import TouchPanel from "./TouchPanel";

export interface UIControllerOptions {
    panel: Muse.ICSPDriver;
}

export abstract class UIController {
    public panel: Muse.ICSPDriver;

    constructor({ panel }: UIControllerOptions) {
        this.panel = panel;
    }
}

export default UIController;
