import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
        accessToken: null,
        userUnit: {},
    },
    reducers: {
        authLogin: (state, action) => ({
            ...state,
        }),
        authRegister: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        authUpdateUser: (state, action) => ({
            user: action.payload.user,
            accessToken: action.payload.accessToken,
        }),
        authFetchMe: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        authRefreshToken: (state, action) => ({}),
        authLogOut: (state, action) => ({}),
        authGetUserUnit: (state, action) => ({ ...state }),
        authUpdateUserUnit: (state, action) => ({
            ...state,
            userUnit: action.payload.userUnit,
        }),
    },
});
export const {
    authLogin,
    authRegister,
    authUpdateUser,
    authFetchMe,
    authRefreshToken,
    authLogOut,
    authGetUserUnit,
    authUpdateUserUnit,
} = authSlice.actions;
export default authSlice.reducer;
