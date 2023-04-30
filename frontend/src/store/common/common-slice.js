import { createSlice } from "@reduxjs/toolkit";
const commonSlice = createSlice({
    name: "common",
    initialState: {
        dashboard: {},
        announce: {},
    },
    reducers: {
        updateAnnounce: (state, action) => {
            return {
                ...state,
                announce: action.payload,
            };
        },

        updateDashboard: (state, action) => {
            return { ...state, dashboard: action.payload };
        },
    },
});
export const { updateAnnounce, updateDashboard } = commonSlice.actions;
export default commonSlice.reducer;
