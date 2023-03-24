import { createSlice } from "@reduxjs/toolkit";

const alanSlice = createSlice({
    name: "alan",
    initialState: {
        command: {},
        checkVoice: false,
    },
    reducers: {
        updateAlan: (state, action) => ({
            ...state,
            command: action.payload,
        }),
        updateCheckVoice: (state, action) => ({
            ...state,
            checkVoice: !state.checkVoice,
        }),
    },
});

export const { updateAlan, updateCheckVoice } = alanSlice.actions;
export default alanSlice.reducer;
