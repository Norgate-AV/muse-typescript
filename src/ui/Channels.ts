import { SNAPI } from "../lib";

export const Channels = {
    TOUCH_TO_START: 1,
    SHUT_DOWN: 2,
    SHUT_DOWN_OK: 3,
    SHUT_DOWN_CANCEL: 4,

    VOLUME: {
        VOL_UP: SNAPI.Channels.VOL_UP,
        VOL_DN: SNAPI.Channels.VOL_DN,
        VOL_MUTE: SNAPI.Channels.VOL_MUTE,
    },

    SOURCE: {
        LAPTOP: 31,
        DOC_CAM: 32,
        PC: 33,
        BYOD: 34,
    },

    RESET_AUDIO: 81,
    AV_MUTE: 131,
} as const;
