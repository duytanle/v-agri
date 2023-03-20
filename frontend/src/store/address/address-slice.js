import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        province: [],
        district: [],
        commune: [],
    },
    reducers: {
        addressGet: (state, action) => {},
        addressUpdate: (state, action) => ({
            province: action.payload.province,
            district: action.payload.district,
            commune: action.payload.commune,
        }),
    },
});
export const { addressUpdate, addressGet } = addressSlice.actions;
export default addressSlice.reducer;
