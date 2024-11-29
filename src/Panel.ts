import { ICSPPort } from "./@types";

export class Panel {
    public static refresh({ panel }: { panel: ICSPPort }): void {}
    public static reset({ panel }: { panel: ICSPPort }): void {}
    public static onlineEventCallback(): void {}
}
