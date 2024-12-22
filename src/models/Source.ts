import { uuid } from "../lib";

export class Source {
    public readonly id: string = uuid();
    public readonly name: string;
    public readonly channel: number;
    public readonly popup: string;
    public readonly switcherInput: number;
    public readonly displayInput: string;

    constructor({
        name,
        channel,
        popup,
        switcherInput,
        displayInput,
    }: {
        name: string;
        channel: number;
        popup: string;
        switcherInput: number;
        displayInput: string;
    }) {
        this.name = name;
        this.channel = channel;
        this.popup = popup;
        this.switcherInput = switcherInput;
        this.displayInput = displayInput;
    }
}
