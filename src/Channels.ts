import { Snapi } from "./lib";

export const Channels = {
    TOUCH_TO_START: 1,
    SHUT_DOWN: 2,
    SHUT_DOWN_OK: 3,
    SHUT_DOWN_CANCEL: 4,

    VOLUME: {
        VOL_UP: Snapi.VOL_UP,
        VOL_DN: Snapi.VOL_DN,
        VOL_MUTE: Snapi.VOL_MUTE,
    },

    SOURCE: {
        LAPTOP: 31,
        DOC_CAM: 32,
        PC: 33,
        BLURAY: 34,
    },

    AV_MUTE: 131,
    RESET_AUDIO: 141,
} as const;
