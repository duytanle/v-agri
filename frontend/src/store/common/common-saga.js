import { takeLatest } from "redux-saga/effects";
import { handleGetAnnounce, handleGetDashboard } from "./common-handlers";

export default function* commonSaga() {
    yield takeLatest("COMMON_GET_ANNOUNCE", handleGetAnnounce);
    yield takeLatest("COMMON_GET_DASHBOARD", handleGetDashboard);
}
