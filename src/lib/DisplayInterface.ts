import { Input } from "./Input";

export interface DisplayInterface {
    powerOn(): void;
    powerOff(): void;
    setInput(input: Input): void;
}
