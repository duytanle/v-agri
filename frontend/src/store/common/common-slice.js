import { createSlice } from "@reduxjs/toolkit";
const commonSlice = createSlice({
    name: "common",
    initialState: {
        dashboard: undefined,
        announce: undefined,
        assess: undefined,
        pdUnitInfo: undefined,
        unitAssess: undefined,
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
        updateAssess: (state, action) => {
            return { ...state, assess: action.payload };
        },
        updatePDUnitInfo: (state, action) => {
            return { ...state, pdUnitInfo: action.payload };
        },
        updateUnitAssess: (state, action) => {
            return { ...state, unitAssess: action.payload };
        },
    },
});
export const {
    updateAnnounce,
    updateDashboard,
    updateAssess,
    updatePDUnitInfo,
    updateUnitAssess,
} = commonSlice.actions;
export default commonSlice.reducer;
