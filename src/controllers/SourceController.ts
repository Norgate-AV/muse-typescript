import TouchPanel from "../lib/TouchPanel";
import UIController, { UIControllerOptions } from "../lib/UIController";
import { UIButtonProperties } from "../lib/UIButtonProperties";

interface SourceControllerOptions extends UIControllerOptions {
    buttons: Array<UIButton>;
}

export class UIButton {
    public properties: UIButtonProperties;

    constructor(properties: UIButtonProperties) {
        this.properties = properties;
    }
}

export class SourceController extends UIController {
    private buttons: Array<UIButton>;

    constructor({ panel, buttons }: SourceControllerOptions) {
        super({ panel });
        this.buttons = buttons;
    }

    public init() {
        this.buttons.forEach(({ properties }) => {
            // let { port, code } = properties.programming.channel;
            // // Ensure that the port and code are numbers at this point
            // port = typeof port === "string" ? parseInt(port) : port;
            // code = typeof code === "string" ? parseInt(code) : code;
            // this.panel.port[port].button[code].watch((event) => {});
        });
    }
}
