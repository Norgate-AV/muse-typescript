import { UIPortCodePair } from "./UIPortCodePair";

export type ButtonType =
    | "general"
    | "multistate_general"
    | "bargraph"
    | "multistate_bargraph"
    | "text_input"
    | "subpage_view"
    | "listview";

export interface IGeneralProps {
    type: ButtonType;
    name?: string;
    left?: number | string;
    top?: number | string;
    width?: number | string;
    height?: number | string;
    disabled: boolean;
    hidden: boolean;
}

export class UIGeneralProps implements IGeneralProps {
    private type: ButtonType;
    disabled: boolean;
    hidden: boolean;

    constructor(type: ButtonType, disabled: boolean, hidden: boolean) {
        this.type = type;
        this.disabled = disabled;
        this.hidden = hidden;
    }
}

export type UIButtonProgrammingProperties = {
    feedback:
        | "none"
        | "channel"
        | "inverted_channel"
        | "always_on"
        | "momentary";
    address: UIPortCodePair;
    channel: UIPortCodePair;
    level: UIPortCodePair;
};

export type UIButtonStateProperties = {
    border?: string;
    background?: string;
    text?: string;
    icon?: string;
};

export type UIButtonProperties = {
    general: UIButtonGeneralProperties;
    programming: UIButtonProgrammingProperties;
    state: any;
};
