import { call, put } from "redux-saga/effects";
import {
    requestGetAccounts,
    requestGetDashboard,
    requestGetUnits,
} from "./account-requests";
import { updateAccounts, updateDashboard, updateUnits } from "./account-slice";
import { toast } from "react-toastify";
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

function* handleGetAccounts({ payload }) {
    try {
        const response = yield call(requestGetAccounts, payload);
        if (response.data.status) {
            yield put(updateAccounts(response.data.result));
        } else {
            toast.info(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            yield put(updateAccounts(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleGetUnits({ payload }) {
    try {
        const response = yield call(requestGetUnits, payload);
        if (response.data.status) {
            yield put(updateUnits(response.data.result));
        } else {
            toast.info(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            yield put(updateUnits(response.data.result));
        }
    } catch (error) {
        console.log(error);
    }
}

export { handleGetDashboard, handleGetAccounts, handleGetUnits };
