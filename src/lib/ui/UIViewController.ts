export abstract class UIViewController {
    public panel: Muse.ICSP.Driver = null;
    public subviews: UIViewController[] = null;
    public backgroundColor: string = null;

    public constructor({ panel }: { panel: Muse.ICSP.Driver }) {
        this.panel = panel;
    }
}
