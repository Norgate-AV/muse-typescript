import { Platform } from "../lib/@types/muse/platform";
import { Source, sources } from "./sources";

/**
 * Devices
 */

const tp = context.devices.get("AMX-10001");
const platform = context.services.get("platform");

const state = {
    selectedSource: null as Source | null,
    currentSource: null as Source | null,
};

function selectSource(source: Source) {
    state.selectedSource = source;

    sendSource(source);
}

function sendSource(source: Source) {
    state.currentSource = source;
}

function tpOnline(_) {
    context.log.info("TP online");

    tp.port[1].send_command("@PPX");
    tp.port[1].send_command("ADBEEP");
}

tp.online(tpOnline);
for (const prop in tp.port) {
    context.log.info(prop);
}

// context.log.info(`TP Container: ${tp.configuration.device.container}`);
// context.log.info(`TP Protocol: ${tp.configuration.device.ptotocolversion}`);
// context.log.info(`TP Venue: ${tp.configuration.device.venue}`);
// context.log.info(`TP Serial Number: ${tp.configuration.device.serialnumber}`);
// context.log.info(
//     `TP Software Version: ${tp.configuration.device.softwareversion}`
// );
// context.log.info(`TP Description: ${tp.configuration.device.description}`);
// context.log.info(`TP Version: ${tp.configuration.device.version}`);
// context.log.info(`TP Manufacturer: ${tp.configuration.device.manufacturer}`);
// context.log.info(`TP Classname: ${tp.configuration.device.classname}`);
// context.log.info(`TP Device State: ${tp.configuration.device.devicestate}`);
// context.log.info(`TP Name: ${tp.configuration.device.name}`);
// context.log.info(
//     `TP Descriptor Location: ${tp.configuration.device.descriptorlocation}`
// );
// context.log.info(`TP GUID: ${tp.configuration.device.guid}`);
// context.log.info(`TP Location: ${tp.configuration.device.location}`);
// context.log.info(`TP Model: ${tp.configuration.device.model}`);
// context.log.info(`TP Family: ${tp.configuration.device.family}`);

// for (const prop in platform) {
//     context.log.info(prop);
// }

// context.log.info(`TP Configuration: ${tp.configuration}`);
// context.log.info(`TP Port: ${tp.port}`);

// context.log.info(`Platform Venue: ${platform.venue}`);
// context.log.info(`Platform Serial Number: ${platform.serialnumber}`);
// context.log.info(`Platform Device State: ${platform.devicestate}`);
// context.log.info(`Platform Name: ${platform.name}`);
// context.log.info(`Platform Description: ${platform.description}`);
// context.log.info(`Platform Location: ${platform.location}`);
// context.log.info(`Platform Model: ${platform.model}`);
// context.log.info(`Platform Label: ${platform.label}`);
// context.log.info(`Platform Family: ${platform.family}`);
// context.log.info(`Platform Version: ${platform.version}`);
// context.log.info(`Platform Manufacturer: ${platform.manufacturer}`);
