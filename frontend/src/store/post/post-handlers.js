import { call, put } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
    requestConfirmVerify,
    requestGetDashboard,
    requestGetProductVerify,
} from "./post-requests";
import { updateDashboard, updateProductVerify } from "./post-slice";
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
function* handleGetProductVerify({ payload }) {
    try {
        const response = yield call(requestGetProductVerify, payload);
        if (response.data.status) {
            yield put(updateProductVerify(response.data.productVerify));
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleConfirmVerify({ payload }) {
    try {
        const response = yield call(requestConfirmVerify, payload);
        if (response.data.status) {
            toast.success(response.data.message, {
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
    } catch (error) {
        console.log(error);
    }
}

export { handleGetDashboard, handleGetProductVerify, handleConfirmVerify };
