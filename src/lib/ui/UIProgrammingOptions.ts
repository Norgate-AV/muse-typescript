import { UIFeedbackType } from "./UIFeedbackType";
import { UICode } from "./UICode";

// export class UIGeneralProps implements IGeneralProps {
//     private type: ButtonType;
//     disabled: boolean;
//     hidden: boolean;
//     constructor(type: ButtonType, disabled: boolean, hidden: boolean) {
//         this.type = type;
//         this.disabled = disabled;
//         this.hidden = hidden;
//     }
// }

export type UIProgrammingOptions = {
    feedback: UIFeedbackType;
    address: UICode;
    channel: UICode;
    level: UICode;
};
