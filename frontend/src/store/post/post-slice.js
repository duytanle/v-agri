import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        dashboard: undefined,
        posts: undefined,
        currentPost: undefined,
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
    },
});

export const { updateDashboard, updatePosts, updateCurrentPost } =
    postSlice.actions;
export default postSlice.reducer;
