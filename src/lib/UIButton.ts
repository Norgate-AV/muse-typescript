import { UIObject } from "./UIObject";

export class UIButton {
    public port: number;
    public code: number;

    constructor(port: number, code: number) {
        this.port = port;
        this.code = code;
    }

    public static create(port: number, code: number): UIButton {
        return new UIButton(port, code);
    }
}
