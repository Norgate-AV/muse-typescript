import { UIViewController } from "./UIViewController";
import { VolumeController } from "./VolumeController";

export class VolumeUIController extends UIViewController {
    private volumeController: VolumeController;

    public constructor({
        panel,
        volumeController,
    }: {
        panel: Muse.ICSPDriver;
        volumeController: VolumeController;
    }) {
        super({ panel });
        this.volumeController = volumeController;
    }
}
