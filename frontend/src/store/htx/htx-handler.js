import { call, put } from "redux-saga/effects";
import {
    requestCancelOrder,
    requestConfirmOrder,
    requestCreateProduct,
    requestHTXUpdateInfo,
    requestIntroProduct,
    requestShip,
} from "./htx-request";
import { toast } from "react-toastify";

function* handleHTXUpdateInfo({ payload }) {
    try {
        const response = yield call(requestHTXUpdateInfo, payload);

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
    } catch (error) {}
}
function* handleHTXCreateProduct({ payload }) {
    try {
        const response = yield call(requestCreateProduct, payload);
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
        console.log(error);
    }
}

function* handleHTXConfirmOrder({ payload }) {
    try {
        const response = yield call(requestConfirmOrder, payload);
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
        console.log(error);
    }
}
function* handleHTXCancelOrder({ payload }) {
    try {
        const response = yield call(requestCancelOrder, payload);
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
        console.log(error);
    }
}

function* handleHTXShipOrder({ payload }) {
    try {
        const response = yield call(requestShip, payload);
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
        console.log(error);
    }
}

function* handleHTXIntroProduct({ payload }) {
    try {
        const response = yield call(requestIntroProduct, payload);
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
        console.log(error);
    }
}
export {
    handleHTXUpdateInfo,
    handleHTXCreateProduct,
    handleHTXConfirmOrder,
    handleHTXCancelOrder,
    handleHTXShipOrder,
    handleHTXIntroProduct,
};
