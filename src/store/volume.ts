import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type VolumeState = {
    level: number;
    mute: boolean;
};

const initialState: VolumeState = {
    level: 0,
    mute: false,
};

export const volumeSlice = createSlice({
    name: "volume",
    initialState,
    reducers: {
        setVolume: (state: VolumeState, action: PayloadAction<number>) => {
            state.level = action.payload;
            console.log(`Volume level set to ${action.payload}`);
        },
        incrementVolume: (state: VolumeState) => {
            state.level = Math.min(state.level + 1, 100);
            console.log(`Volume level incremented to ${state.level}`);
        },
        decrementVolume: (state: VolumeState) => {
            state.level = Math.max(state.level - 1, 0);
            console.log(`Volume level decremented to ${state.level}`);
        },
        toggleMute: (state: VolumeState) => {
            state.mute = !state.mute;
            console.log(`Volume mute toggled to ${state.mute}`);
        },
        setMute: (state: VolumeState, action: PayloadAction<boolean>) => {
            state.mute = action.payload;
            console.log(`Volume mute set to ${action.payload}`);
        },
    },
});

export const {
    setVolume,
    incrementVolume,
    decrementVolume,
    setMute,
    toggleMute,
} = volumeSlice.actions;

export const selectVolumeLevel = (state: RootState) => state.volume.level;
export const selectVolumeMute = (state: RootState) => state.volume.mute;

export default volumeSlice.reducer;
