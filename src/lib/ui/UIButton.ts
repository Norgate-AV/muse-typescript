// import { UIButtonProperties } from "./UIButtonProperties";

import { UIObject, UIObjectOptions } from "./UIObject";

// const options = {
//     general: { type: "general", disabled: false, hidden: false },
//     programming: {
//         feedback: "none",
//         address: { port: 1 },
//         channel: { port: 1 },
//         level: { port: 1 },
//     },
// };

export interface UIButtonOptions extends UIObjectOptions {}

export class UIButton extends UIObject {
    constructor(options: UIButtonOptions) {
        super(options);
    }

    protected onChangeEvent(event: any): void {
        throw new Error("Method not implemented.");
    }
}
