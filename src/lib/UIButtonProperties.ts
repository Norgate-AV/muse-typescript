import { UIPortCodePair } from "./UIPortCodePair";

export type UIButtonProperties = {
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
