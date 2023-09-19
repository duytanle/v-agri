import { call, put } from "redux-saga/effects";
import {
    requestAuthGetUser,
    requestAuthGetUserUnit,
    requestAuthLogin,
    requestAuthRefreshToken,
    requestAuthRegister,
} from "./auth-requests";
import { logOut, saveToken } from "../../utils/auth.js";
import { authUpdateUser, authUpdateUserUnit } from "./auth-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* handleAuthRegister({ payload }) {
    try {
        const response = yield call(requestAuthRegister, payload);
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

function* handleAuthLogin({ payload }) {
    try {
        const response = yield call(requestAuthLogin, payload);
        if (
            response.data.tokens.accessToken &&
            response.data.tokens.refreshToken
        ) {
            saveToken(
                response.data.tokens.accessToken,
                response.data.tokens.refreshToken
            );
            yield call(handleAuthGetUser, {
                payload: response.data.tokens.accessToken,
            });
        }
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

function* handleAuthGetUser({ payload }) {
    try {
        const response = yield call(requestAuthGetUser, payload);
        if (response.data.status === true) {
            yield put(
                authUpdateUser({
                    user: response.data.ND,
                    accessToken: payload,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleAuthRefreshToken({ payload }) {
    try {
        const response = yield call(requestAuthRefreshToken, payload);
        if (response.data.status) {
            saveToken(
                response.data.tokens.accessToken,
                response.data.tokens.refreshToken
            );
            yield call(handleAuthGetUser, {
                payload: response.data.tokens.accessToken,
            });
        }
    } catch (error) {}
}

function* handleAuthLogOut() {
    yield put(
        authUpdateUser({
            user: undefined,
            accessToken: null,
        })
    );
    logOut();
    toast.success("Đăng xuất thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
function* handleAuthGetUserUnit({ payload }) {
    try {
        const response = yield call(requestAuthGetUserUnit, payload);
        if (response.data.status) {
            yield put(
                authUpdateUserUnit({
                    userUnit: response.data.result,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}
export {
    handleAuthLogin,
    handleAuthRegister,
    handleAuthGetUser,
    handleAuthRefreshToken,
    handleAuthLogOut,
    handleAuthGetUserUnit,
};
