import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        dashboard: undefined,
        accounts: undefined,
        currentAccount: undefined,
        units: undefined,
        currentUnit: undefined,
    },
    reducers: {
        updateDashboard: (state, action) => ({
            ...state,
            dashboard: action.payload,
        }),
        updateAccounts: (state, action) => ({
            ...state,
            accounts: action.payload,
        }),
        updateCurrentAccount: (state, action) => ({
            ...state,
            currentAccount: action.payload,
        }),
        updateUnits: (state, action) => ({
            ...state,
            units: action.payload,
        }),
        updateCurrentUnit: (state, action) => ({
            ...state,
            currentUnit: action.payload,
        }),
    },
});

export const {
    updateDashboard,
    updateAccounts,
    updateCurrentAccount,
    updateCurrentUnit,
    updateUnits,
} = accountSlice.actions;
export default accountSlice.reducer;
