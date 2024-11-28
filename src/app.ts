import { ICSPDriver, ParameterUpdate, TimelineService } from "./@types";
import { Source, sources } from "./sources";
import { state } from "./store";
import { getConfig } from "./utils/getConfig";
import { version } from "../package.json";
import { Pages, Page } from "./pages";
import { Popups } from "./popups";

/**
 * Devices
 */

// MT-1002
const tp = context.devices.get<ICSPDriver>("AMX-10001");

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
    state.requiredPopup = source.popup;
    context.log.info("Selected Source: " + source?.name);

    sendSource(source);

    tpRefresh();
}

function sendSource(source: Source): void {
    state.currentSource = source;
    context.log.info(`Sending ${source.name} to Display`);
}

function tpOnlineEventCallback(): void {
    context.log.info(`Touch Panel Online`);

    registerSourceButtonEvents(sources);
    tp.port[1].button[1].watch(touchToStart);
    tp.port[1].button[2].watch(handleShutDownButtonEvent);
    tp.port[1].button[3].watch(handleShutDownOkButtonEvent);

    tpFeedbackSetup();
    tpReset();
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
    setPage(Pages.Main);
}

function tpFeedbackSetup(): void {
    const tpFeedback = context.services.get<TimelineService>("timeline");
    tpFeedback.expired.listen(tpFeedbackHandler);
    tpFeedback.start([100], false, -1);
}

function tpFeedbackHandler(): void {
    for (const source of sources) {
        const { port, code } = source.button?.channel;
        if (!state.selectedSource) {
            tp.port[port].channel[code] = false;
            continue;
        }

        tp.port[port].channel[code] =
            state.selectedSource.button?.channel.code === code;
    }
}

function handleShutDownButtonEvent(event: ParameterUpdate<boolean>): void {
    if (!event.value) {
        return;
    }

    tp.port[1].send_command("@PPN-Dialogs - Shut Down");
}

function handleShutDownOkButtonEvent(event: ParameterUpdate<boolean>): void {
    if (!event.value) {
        return;
    }

    shutDown();
}

function shutDown(): void {
    state.selectedSource = null;
    state.currentSource = null;
    state.requiredPopup = Popups.Off;

    setPage(Pages.Logo);
}

function setPage(page: Page): void {
    state.requiredPage = page;
    tpRefresh();
}

function tpReset(): void {
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

    tpRefresh();
}

function tpRefresh() {
    tp.port[1].send_command("@PPF-Dialogs - Audio");
    tp.port[1].send_command(`PAGE-${state.requiredPage}`);

    switch (state.requiredPage) {
        case Pages.Main: {
            tp.port[1].send_command(
                `@PPN-${state.requiredPopup};${state.requiredPage}`
            );
            break;
        }
        case Pages.Logo: {
            tp.port[1].send_command(
                `@PPN-${state.requiredPopup};${Pages.Main}`
            );
            break;
        }
    }
}

/**
 * Event Listeners
 */
tp.online(tpOnlineEventCallback);
