export const Snapi = {
    PLAY: 1,
    STOP: 2,
    PAUSE: 3,
    FFWD: 4,
    REW: 5,
    SFWD: 6,
    SREV: 7,
    RECORD: 8,
    POWER: 9,

    VOL_UP: 24,
    VOL_UP_FB: 24,
    VOL_DN: 25,
    VOL_DN_FB: 25,
    VOL_MUTE: 26,

    PWR_ON: 27,
    PWR_OFF: 28,

    ZOOM_OUT: 158,
    ZOOM_IN: 159,
    FOCUS_NEAR: 160,
    FOCUS_FAR: 161,

    AUTO_FOCUS: 172,

    FRAME_FWD: 185,
    FRAME_REV: 186,
    SLOW_FWD: 188,
    SLOW_REV: 189,
    SCAN_SPEED: 192,

    VOL_MUTE_ON: 199,
    VOL_MUTE_FB: 199,

    PLAY_FB: 241,
    STOP_FB: 242,
    PAUSE_FB: 243,
    SFWD_FB: 246,
    SREV_FB: 247,
    RECORD_FB: 248,
    SLOW_FWD_FB: 249,
    SLOW_REV_FB: 250,

    DEVICE_COMMUNICATING: 251,
    DATA_INITIALIZED: 252,
    POWER_ON: 255,
    POWER_FB: 255,
} as const;

export default Snapi;

// export type Snapi = typeof Snapi;
