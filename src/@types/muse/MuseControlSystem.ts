import { name, plugins } from "../../../program.json";
import { RootState } from "../../state/store";
import type { Store } from "redux";

export interface MuseControlSystemOptions {
    store?: Store<RootState>;
}

export abstract class MuseControlSystem {
    public readonly store: Store<RootState>;
    public readonly services = {
        platform: context.services.get<Muse.PlatformService>("platform"),
    };
    public interval: string = "";

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

        console.log(`Typeof Platform: ${typeof this.services.platform}`);

        // @ts-ignore
        // console.log(this.toJsObject(this.services.platform));
        // let obj = {};

        // // @ts-ignore
        // const fields = this.services.platform.getClass().getDeclaredFields();

        // for (const field of fields) {
        //     field.setAccessible(true);
        //     obj[field.getName()] = field.get(this.services.platform);
        // }

        // console.log(obj);

        this.store.subscribe(() => console.log(this.store.getState()));

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

    public toJSObject(obj: any): any {
        var result = {};
        var fields = obj.getClass().getDeclaredFields();
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            field.setAccessible(true);
            result[field.getName()] = field.get(obj);
        }

        return result;
    }

    public abstract init(): Promise<this>;
}

export default MuseControlSystem;
