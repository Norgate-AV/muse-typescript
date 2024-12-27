import { UIFeedbackType } from "./UIFeedbackType";
import { UICode } from "./UICode";

export type UIProgrammingOptions = {
    feedback: UIFeedbackType;
    address: UICode;
    channel: UICode;
    level: UICode;
};
