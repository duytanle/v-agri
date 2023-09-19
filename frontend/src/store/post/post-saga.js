import { takeLatest } from "redux-saga/effects";
import {
    handleConfirmVerify,
    handleGetDashboard,
    handleGetProductVerify,
} from "./post-handlers";

export default function* postSaga() {
    yield takeLatest("QTVBD_GET_DASHBOARD", handleGetDashboard);
    yield takeLatest("QTVBD_GET_PRODUCT_VERIFY", handleGetProductVerify);
    yield takeLatest("QTVBD_CONFIRM_VERIFY", handleConfirmVerify);
    // yield takeLatest("QTV_GET_ACCOUNTS", handleGetAccounts);
    // yield takeLatest("QTV_GET_UNITS", handleGetUnits);
}
