import type { ValueOf } from "../@types";

const Commands = {
    CloseAllPopups: "@PPX",
    SingleBeep: "ABEEP",
    DoubleBeep: "ADBEEP",
    PopupShow: "@PPN",
    PopupHide: "@PPF",
    Page: "PAGE",
    Text: "^TXT",
    ShowButton: "^SHO",
    EnableButton: "^ENA",
} as const;

class TouchPanelCommand {
    public static closeAllPopups(): string {
        return Commands.CloseAllPopups;
    }

    public static singleBeep(): string {
        return Commands.SingleBeep;
    }

    public static doubleBeep(): string {
        return Commands.DoubleBeep;
    }

    public static popupShow({
        name,
        page,
    }: {
        name: string;
        page?: string;
    }): string {
        if (page) {
            return `${Commands.PopupShow}-${name};${page}`;
        }

        return `${Commands.PopupShow}-${name}`;
    }

    public static popupHide({
        name,
        page,
    }: {
        name: string;
        page?: string;
    }): string {
        if (page) {
            return `${Commands.PopupHide}-${name};${page}`;
        }

        return `${Commands.PopupHide}-${name}`;
    }

    public static page(name: string): string {
        return `${Commands.Page}-${name}`;
    }

    public static text({
        address,
        states = "0",
        text,
    }: {
        address: string | number;
        states?: string | number;
        text: string;
    }): string {
        return `${Commands.Text}-${address},${states},${text}`;
    }

    public static showButton({
        address,
        state,
    }: {
        address: string | number;
        state: boolean;
    }): string {
        return `${Commands.ShowButton}-${address},${state ? "1" : "0"}`;
    }

    public static enableButton({
        address,
        state,
    }: {
        address: string | number;
        state: boolean;
    }): string {
        return `${Commands.EnableButton}-${address},${state ? "1" : "0"}`;
    }
}

export default TouchPanelCommand;
