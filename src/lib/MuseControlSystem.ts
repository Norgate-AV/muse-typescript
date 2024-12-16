import { name, plugins } from "../../program.json";

export interface MuseControlSystemOptions {}

export abstract class MuseControlSystem {
    public services = {
        platform: context.services.get<Muse.PlatformService>("platform"),
    };

    public constructor(options: MuseControlSystemOptions) {
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

export default MuseControlSystem;
