import { RootState } from ".";
import { PayloadAction } from "../@types/PayloadAction";
import { Slice } from "../lib/Slice";

type VolumeState = {
    level: number;
    mute: boolean;
};

const initialState: VolumeState = {
    level: 0,
    mute: false,
};

export const volumeSlice = Slice.createSlice({
    name: "volume",
    initialState,
    reducers: {
        setVolume: (state: VolumeState, action: PayloadAction<number>) => {
            state.level = action.payload;
            console.log(`Volume level set to ${action.payload}`);
        },
    },
});

export const { setVolume } = volumeSlice.actions;

export const selectVolume = (state: RootState) => state.volume;
export const selectVolumeLevel = (state: RootState) => state.volume.level;

export const volumeReducer = volumeSlice.reducer;
