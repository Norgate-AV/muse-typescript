import { DisplayInterface } from "./DisplayInterface";
import { DisplayOptions } from "./DisplayOptions";
import { Input } from "./Input";

export abstract class Display implements DisplayInterface {
    protected readonly id: string;
    protected readonly name: string;

    constructor({ id, name }: DisplayOptions) {
        this.id = id;
        this.name = name;
    }

    abstract powerOn(): void;
    abstract powerOff(): void;
    abstract setInput(input: Input): void;
}
