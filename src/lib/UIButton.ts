import { UIButtonProperties } from "./UIButtonProperties";

export class UIButton {
    public props: UIButtonProperties;

    constructor(props: UIButtonProperties) {
        this.props = props;
    }

    public static create(props: UIButtonProperties = {}): UIButton {
        return new UIButton(props);
    }
}
