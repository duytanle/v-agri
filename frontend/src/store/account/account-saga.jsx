import { takeLatest } from "redux-saga/effects";
import {
    handleGetAccounts,
    handleGetDashboard,
    handleGetUnits,
} from "./account-handlers";

export default function* accountSaga() {
    yield takeLatest("QTV_GET_DASHBOARD", handleGetDashboard);
    yield takeLatest("QTV_GET_ACCOUNTS", handleGetAccounts);
    yield takeLatest("QTV_GET_UNITS", handleGetUnits);
}
