import TouchPanel from "../lib/TouchPanel";
import UIController, { UIControllerOptions } from "../lib/UIController";
import { UIButtonProperties } from "../lib/UIButtonProperties";
import { UIButton } from "../lib/UIButton";

interface SourceControllerOptions extends UIControllerOptions {
    buttons: Array<UIButton>;
}

export class SourceController extends UIController {
    private buttons: Array<UIButton>;

    constructor({ panel, buttons }: SourceControllerOptions) {
        super({ panel });
        this.buttons = buttons;
    }

    public init() {
        this.buttons.forEach(({ port, code }) => {
            this.panel.port[port].button[code].watch((event) => {});
        });
    }
}
