import { takeLatest } from "redux-saga/effects";
import {
    handleAuthGetUserUnit,
    handleAuthLogin,
    handleAuthLogOut,
    handleAuthRefreshToken,
    handleAuthRegister,
} from "./auth-handlers";
import {
    authGetUserUnit,
    authLogin,
    authLogOut,
    authRefreshToken,
    authRegister,
} from "./auth-slice";
export default function* authSaga() {
    yield takeLatest(authRegister.type, handleAuthRegister);
    yield takeLatest(authLogin.type, handleAuthLogin);
    yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
    yield takeLatest(authLogOut.type, handleAuthLogOut);
    yield takeLatest(authGetUserUnit.type, handleAuthGetUserUnit);
}
