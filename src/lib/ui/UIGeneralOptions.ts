import { UIButtonType } from "./UIButtonType";

export type UIGeneralOptions = {
    type: UIButtonType;
    name?: string;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    disabled: boolean;
    hidden: boolean;
};
