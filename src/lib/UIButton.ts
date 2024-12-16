import { UIButtonProperties } from "./UIButtonProperties";

const defaultProps: UIButtonProperties = {
    general: { type: "general", disabled: false, hidden: false },
    programming: {
        address: { port: 1 },
        channel: { port: 1 },
        level: { port: 1 },
    },
};

export class UIButton {
    public props: UIButtonProperties;

    constructor(props: UIButtonProperties = defaultProps) {
        this.props = props;
    }

    public static create(props: UIButtonProperties = defaultProps): UIButton {
        return new UIButton(props);
    }
}
