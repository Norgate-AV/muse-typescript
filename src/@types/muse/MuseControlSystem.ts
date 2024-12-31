import { name } from "../../../program.json";

export abstract class MuseControlSystem {
    public readonly idevice: Muse.IDevice | null = null;
    public readonly led: Muse.LED | null = null;

    public readonly services = {
        platform: context.services.get("platform"),
        diagnostic: context.services.get("diagnostic"),
        session: context.services.get("session"),
        smtp: context.services.get("smtp"),
    };

    public constructor(options: MuseControlSystemOptions) {
        if (context.devices.has("idevice")) {
            this.idevice = context.devices.get("idevice");
        }

        if (context.devices.has("led")) {
            this.led = context.devices.get("led");
        }

        const System = Java.type<typeof java.lang.System>("java.lang.System");

        System.setProperty(
            "PROGRAM_DIR",
            `${System.getProperty("karaf.mojo")}/program/${name}`,
        );

        console.log(`Platform Name: ${this.services.platform.name}`);
        console.log(`Platform Model: ${this.services.platform.model}`);
        console.log(`Platform Serial: ${this.services.platform.serialnumber}`);
        console.log(`Platform Version: ${this.services.platform.version}`);
    }

    public abstract init(): Promise<this>;
}
