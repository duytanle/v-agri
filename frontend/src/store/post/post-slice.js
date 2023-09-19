import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        dashboard: undefined,
        posts: undefined,
        currentPost: undefined,
        productVerify: undefined,
        currentVerify: undefined,
    },
    reducers: {
        updateDashboard: (state, action) => ({
            ...state,
            dashboard: action.payload,
        }),
        updatePosts: (state, action) => ({
            ...state,
            accounts: action.payload,
        }),
        updateCurrentPost: (state, action) => ({
            ...state,
            currentAccount: action.payload,
        }),
        updateProductVerify: (state, action) => ({
            ...state,
            productVerify: action.payload,
        }),
        updateCurrentVerify: (state, action) => ({
            ...state,
            currentVerify: action.payload,
        }),
    },
});

export const {
    updateDashboard,
    updatePosts,
    updateCurrentPost,
    updateProductVerify,
    updateCurrentVerify,
} = postSlice.actions;
export default postSlice.reducer;
