import { name, plugins } from "../../../program.json";

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
}

export default MuseControlSystem;
