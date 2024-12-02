import UIController, { UIControllerOptions } from "../lib/UIController";

interface SourceControllerOptions extends UIControllerOptions {}

export class SourceController extends UIController {
    constructor(options: SourceControllerOptions) {
        super(options);
    }
}
