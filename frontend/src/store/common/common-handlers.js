import { call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import { requestGetAnnounce, requestGetDashboard } from "./common-request";
import { updateAnnounce, updateDashboard } from "./common-slice";
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

export { handleGetAnnounce, handleGetDashboard };
