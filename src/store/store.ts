import { Pages, Page } from "../pages";
import { Popups, Popup } from "../popups";
import { Source } from "../sources";
import { Config } from "../utils/getConfig";

type State = {
    selectedSource: Source | null;
    currentSource: Source | null;

    requiredPage: Page;
    requiredPopup: Popup;

    config: Config | null;
};

export const state: State = {
    selectedSource: null,
    currentSource: null,

    requiredPage: Pages.Logo,
    requiredPopup: Popups.Off,

    config: null,
};
