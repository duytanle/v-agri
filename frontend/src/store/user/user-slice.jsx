import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        listUser: [],
        listCurrentUser: [],
        currentUser: {},
    },
    reducers: {
        userGetList: (state, action) => {},
        userUpdateCurrentUser: (state, action) => ({
            ...state,
            currentUser: action.payload.currentUser,
        }),
        useUpdateListCurrentUser: (state, action) => ({
            ...state,
            listCurrentUser: action.payload.listCurrentUser,
        }),
    },
});

export const { userGetList, userUpdateCurrentUser, useUpdateListCurrentUser } =
    userSlice.actions;
export default userSlice.reducer;
