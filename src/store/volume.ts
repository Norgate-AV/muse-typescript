// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from ".";

export const VolumeAction = {
    SET_VOLUME: "SET_VOLUME",
    INCREMENT_VOLUME: "INCREMENT_VOLUME",
    DECREMENT_VOLUME: "DECREMENT_VOLUME",
    TOGGLE_MUTE: "TOGGLE_MUTE",
    SET_MUTE: "SET_MUTE",
} as const;

export type VolumeState = {
    level: number;
    mute: boolean;
};

const initialState: VolumeState = {
    level: 0,
    mute: false,
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case VolumeAction.SET_VOLUME:
            return {
                ...state,
                level: action.payload,
            };
        case VolumeAction.INCREMENT_VOLUME:
            return {
                ...state,
                level: Math.min(state.level + 1, 100),
            };
        case VolumeAction.DECREMENT_VOLUME:
            return {
                ...state,
                level: Math.max(state.level - 1, 0),
            };
        case VolumeAction.TOGGLE_MUTE:
            return {
                ...state,
                mute: !state.mute,
            };
        case VolumeAction.SET_MUTE:
            return {
                ...state,
                mute: action.payload,
            };
        default:
            return state;
    }
}

// export const volumeSlice = createSlice({
//     name: "volume",
//     initialState,
//     reducers: {
//         setVolume: (state: VolumeState, action: PayloadAction<number>) => {
//             state.level = action.payload;
//             console.log(`Volume level set to ${action.payload}`);
//         },
//         incrementVolume: (state: VolumeState) => {
//             state.level = Math.min(state.level + 1, 100);
//             console.log(`Volume level incremented to ${state.level}`);
//         },
//         decrementVolume: (state: VolumeState) => {
//             state.level = Math.max(state.level - 1, 0);
//             console.log(`Volume level decremented to ${state.level}`);
//         },
//         toggleMute: (state: VolumeState) => {
//             state.mute = !state.mute;
//             console.log(`Volume mute toggled to ${state.mute}`);
//         },
//         setMute: (state: VolumeState, action: PayloadAction<boolean>) => {
//             state.mute = action.payload;
//             console.log(`Volume mute set to ${action.payload}`);
//         },
//     },
// });

// export const {
//     setVolume,
//     incrementVolume,
//     decrementVolume,
//     setMute,
//     toggleMute,
// } = volumeSlice.actions;

// export const selectVolumeLevel = (state: RootState) => state.volume.level;
// export const selectVolumeMute = (state: RootState) => state.volume.mute;

// export default volumeSlice.reducer;
