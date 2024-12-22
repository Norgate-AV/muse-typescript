export abstract class UIViewController {
    public panel: Muse.ICSPDriver = null;
    public subviews: UIViewController[] = null;
    public backgroundColor: string = null;

    public constructor({ panel }: { panel: Muse.ICSPDriver }) {
        this.panel = panel;
    }
}
