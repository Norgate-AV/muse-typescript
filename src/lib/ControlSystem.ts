import { name, plugins } from "../../program.json";

export interface ControlSystemOptions {}

class ControlSystem {
    public services = {
        platform: context.services.get<Muse.PlatformService>("platform"),
        timeline: context.services.get<Muse.TimelineService>("timeline"),
    };

    constructor(options: ControlSystemOptions) {
        const System = Java.type<typeof java.lang.System>("java.lang.System");

        System.setProperty(
            "PROGRAM_DIR",
            `${System.getProperty("karaf.mojo")}/program/${name}`,
        );

        print(`Platform Name: ${this.services.platform.name}`);
        print(`Platform Serial: ${this.services.platform.serialnumber}`);
        print(`Platform Version: ${this.services.platform.version}`);

        if (!plugins.length) {
            return;
        }

        try {
            print("Loading plugins...");

            for (const plugin of plugins) {
                print(`Loading ${plugin}...`);
                load(`${System.getProperty("PROGRAM_DIR")}/${plugin}`);
            }
        } catch (error: unknown) {
            context.log.error(`Error loding plugins: ${error}`);
        }
    }
}

export default ControlSystem;
