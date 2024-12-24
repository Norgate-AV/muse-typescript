import { name, plugins } from "../../../program.json";
import { RootState } from "../../store";
import type { Store } from "redux";

export interface MuseControlSystemOptions {
    store?: Store<RootState>;
}

export abstract class MuseControlSystem {
    public readonly store: Store<RootState>;
    public readonly services = {
        platform: context.services.get<Muse.PlatformService>("platform"),
    };

    public constructor(options: MuseControlSystemOptions) {
        this.store = options.store;

        const System = Java.type<typeof java.lang.System>("java.lang.System");

        System.setProperty(
            "PROGRAM_DIR",
            `${System.getProperty("karaf.mojo")}/program/${name}`,
        );

        console.log(`Platform Name: ${this.services.platform.name}`);
        console.log(`Platform Model: ${this.services.platform.model}`);
        console.log(`Platform Serial: ${this.services.platform.serialnumber}`);
        console.log(`Platform Version: ${this.services.platform.version}`);

        if (!plugins.length) {
            return;
        }

        try {
            console.log("Loading plugins...");

            for (const plugin of plugins) {
                console.log(`Loading ${plugin}...`);
                load(`${System.getProperty("PROGRAM_DIR")}/${plugin}`);
            }
        } catch (error: unknown) {
            console.error(`Error loding plugins: ${error}`);
        }
    }

    public abstract init(): this;
}

export default MuseControlSystem;
