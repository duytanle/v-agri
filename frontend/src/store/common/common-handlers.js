import { call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
    requestGetAnnounce,
    requestGetAssessProduct,
    requestGetDashboard,
    requestGetUnitAssess,
} from "./common-request";
import {
    updateAnnounce,
    updateAssess,
    updateDashboard,
    updatePDUnitInfo,
    updateUnitAssess,
} from "./common-slice";
function* handleGetAnnounce({ payload }) {
    try {
        const response = yield call(requestGetAnnounce, payload);
        if (response.data.status) {
            yield put(updateAnnounce(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleGetDashboard({ payload }) {
    try {
        const response = yield call(requestGetDashboard, payload);
        if (response.data.status) {
            yield put(updateDashboard(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleGetAssessProduct({ payload }) {
    try {
        const response = yield call(requestGetAssessProduct, payload);

        if (response.data.status) {
            yield put(updateAssess(response.data.assess));
            yield put(updatePDUnitInfo(response.data.unit));
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleGetUnitAssess({ payload }) {
    try {
        const response = yield call(requestGetUnitAssess, payload);

        if (response.data.status) {
            yield put(updateAssess(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleGetUnitAssessProduct({ payload }) {
    try {
        const response = yield call(requestGetUnitAssess, payload);

        if (response.data.status) {
            yield put(updateUnitAssess(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}
export {
    handleGetAnnounce,
    handleGetDashboard,
    handleGetAssessProduct,
    handleGetUnitAssess,
    handleGetUnitAssessProduct,
};
