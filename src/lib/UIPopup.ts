import { UIPage } from "./UIPage";

export class UIPopup {
    public name: string;
    public page: UIPage;

    constructor({
        name,
        page = { name: "" },
    }: {
        name: string;
        page?: UIPage;
    }) {
        this.name = name;
        this.page = page;
    }
}
