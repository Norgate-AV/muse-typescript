// import { UIButtonProperties } from "./UIButtonProperties";

import { UIObject } from "./UIObject";

const options = {
    general: { type: "general", disabled: false, hidden: false },
    programming: {
        feedback: "none",
        address: { port: 1 },
        channel: { port: 1 },
        level: { port: 1 },
    },
};

export class UIButton extends UIObject {
    constructor(options) {
        super(options);
    }

    protected onChangeEvent(event: any): void {
        throw new Error("Method not implemented.");
    }
}
