import { takeLatest } from "redux-saga/effects";
import {
    handleGetAnnounce,
    handleGetAssessProduct,
    handleGetDashboard,
    handleGetUnitAssess,
    handleGetUnitAssessProduct,
} from "./common-handlers";

export default function* commonSaga() {
    yield takeLatest("COMMON_GET_ANNOUNCE", handleGetAnnounce);
    yield takeLatest("COMMON_GET_DASHBOARD", handleGetDashboard);
    yield takeLatest("COMMON_GET_ASSESS_PRODUCT", handleGetAssessProduct);
    yield takeLatest("COMMON_GET_ASSESS_UNIT", handleGetUnitAssess);
    yield takeLatest(
        "COMMON_GET_ASSESS_UNIT_PRODUCT",
        handleGetUnitAssessProduct
    );
}
