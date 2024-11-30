import ControlSystem, { ControlSystemOptions } from "./ControlSystem";
import TouchPanel from "./TouchPanel";

interface AppOptions extends ControlSystemOptions {
    context: Muse.Context;
}

class App extends ControlSystem {
    private panel: TouchPanel;

    constructor({ context }: AppOptions) {
        super({ context });
    }

    public init(): this {
        this.console.info("App Initializing");

        this.panel = new TouchPanel({ context: this.context, id: "AMX-10002" });

        return this;
    }
}

export default App;
