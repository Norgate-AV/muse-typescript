import { ICSPDriver, ParameterUpdate, TimelineService } from "../lib/@types";
import { Source, sources } from "./sources";
import { state } from "./store";
import { getConfig } from "./utils/getConfig";
import { version } from "../package.json";
import { setInterval } from "./utils/setInterval";

/**
 * Devices
 */

// MT-1002
const tp = context.devices.get<ICSPDriver>("AMX-10001");

// EXB-MP1
const io = context.devices.get<ICSPDriver>("AMX-7001").port[2];

setInterval(() => {
    context.log.info("Toggling IO");
    context.log.info(`IO 1: ${io.channel[1]}`);
    context.log.info(`IO 2: ${io.channel[2]}`);

    context.log.info(`${typeof io.channel[1]}`);

    for (const prop in io.channel[1]) {
        context.log.info(`${prop}`);
    }
}, 5000);

/**
 * Functions
 */
function selectSource(event: ParameterUpdate<boolean>): void {
    if (!event.value) {
        return;
    }

    const [source] = sources.filter(
        (source) => source.button.channel.code.toString() === event.id
    );

    if (!source) {
        context.log.info("Source not found");
        return;
    }

    state.selectedSource = source;
    context.log.info("Selected Source: " + source?.name);

    sendSource(source);
}

function sendSource(source: Source): void {
    state.currentSource = source;
    context.log.info(`Sending ${source.name} to Display`);
}

function tpOnlineEventCallback(): void {
    context.log.info(`TP Online: ${tp.isOnline()}`);
    context.log.info(`TP Offline: ${tp.isOffline()}`);

    registerSourceButtonEvents(sources);
    tp.port[1].button[1].watch(touchToStart);

    // tpFeedbackSetup();

    const [config, error] = getConfig();
    if (error !== null) {
        context.log.error(`Error reading config: ${error}`);
    }

    tp.port[1].send_command(`^TXT-1,0,${config.name}`);

    const programInfo = {
        name: config.name,
        version,
        compiled: new Date().toISOString(),
        getInfo: function () {
            return `${this.name} v${this.version} compiled on ${this.compiled}`;
        },
    };

    tp.port[1].send_command(`^TXT-100,0,${programInfo.getInfo()}`);

    tp.port[1].send_command("@PPX");
    tp.port[1].send_command("ADBEEP");
    tp.port[1].send_command("PAGE-Logo");
}

function registerSourceButtonEvents(sources: Array<Source>): void {
    for (const source of sources) {
        const { port, code } = source.button.channel;
        context.log.info(
            `Registering ${source.name} on port ${port} code ${code}`
        );
        tp.port[port].button[code].watch(selectSource);
    }
}

function touchToStart(event: ParameterUpdate<boolean>): void {
    tp.port[1].send_command("PAGE-Main");
}

function tpFeedbackSetup(): void {
    const tpFeedback = context.services.get<TimelineService>("timeline");
    tpFeedback.expired.listen(tpFeedbackHandler);
    tpFeedback.start([100], false, -1);
}

function tpFeedbackHandler(): void {
    for (const source of sources) {
        const { port, code } = source.button.channel;
        tp.port[port].channel[code] =
            state.selectedSource.button.channel.code === code;
    }
}

/**
 * Event Listeners
 */
tp.online(tpOnlineEventCallback);
