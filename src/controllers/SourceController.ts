import TouchPanel from "../lib/TouchPanel";
import UIController, { UIControllerOptions } from "../lib/UIController";

interface SourceControllerOptions extends UIControllerOptions {
    buttons: UIButton[];
    func: Function;
}

type UIPortCodePair = {
    port: number | string;
    code: number | string;
};

type UIButtonProperties = {
    general?: {
        type?:
            | "general"
            | "multistate_general"
            | "bargraph"
            | "multistate_bargraph"
            | "text_input"
            | "subpage_view"
            | "listview";
        name?: string;
        description?: string;
        left?: number | string;
        top?: number | string;
        width?: number | string;
        height?: number | string;
        disabled?: boolean;
        hidden?: boolean;
    };
    programming?: {
        feedback?:
            | "none"
            | "channel"
            | "inverted_channel"
            | "always_on"
            | "momentary";
        address?: UIPortCodePair;
        channel?: UIPortCodePair;
        level?: UIPortCodePair;
    };
};

class UIButton {
    public properties: UIButtonProperties;

    constructor(properties: UIButtonProperties) {
        this.properties = properties;
    }
}

export class SourceController extends UIController {
    private buttons: UIButton[];
    private func: Function;

    constructor({ panel, buttons, func }: SourceControllerOptions) {
        super({ panel });

        this.buttons = buttons;
        this.func = func;

        this.subscribeToButtonEvents();
    }

    private subscribeToButtonEvents() {
        this.buttons.forEach(({ properties }) => {
            let { port, code } = properties.programming.channel;

            // Ensure that the port and code are numbers at this point
            port = typeof port === "string" ? parseInt(port) : port;
            code = typeof code === "string" ? parseInt(code) : code;

            this.panel.port[port].button[code].watch((value) => {
                this.func(value);
            });
        });
    }
}
