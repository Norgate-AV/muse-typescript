export {};

import { MuseControlSystem } from "./MuseControlSystem";

declare global {
    interface MuseControlSystemOptions {}

    interface GlobalMuseControlSystem {
        new (options: MuseControlSystemOptions): MuseControlSystem;
    }

    var MuseControlSystem: GlobalMuseControlSystem;
}
