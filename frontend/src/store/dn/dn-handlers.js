import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
    requestAddToCart,
    requestCreateProduct,
    requestDNGetIntro,
    requestGetCart,
    requestOrderProduct,
    requestReceive,
    requestUpdateCartItem,
} from "./dn-requests";
import { dnUpdateCart, dnUpdateCartItem, dnUpdateIntro } from "./dn-slice";

function* handleDNCreateProduct({ payload }) {
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
            theme: "light",
        });
    } catch (error) {
        console.log(error);
    }
}

function* handleAddToCart({ payload }) {
    try {
        const response = yield call(requestAddToCart, payload);
        if (response.data.status) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleGetCart({ payload }) {
    try {
        const response = yield call(requestGetCart, payload);
        if (response.data.status) {
            yield put(dnUpdateCart({ cart: response.data.result }));
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleUpdateCartItem({ payload }) {
    try {
        const response = yield call(requestUpdateCartItem, payload);
        if (response.data.status) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            yield put(dnUpdateCartItem());
        }
    } catch (error) {
        toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}
function* handleDNOrderProduct({ payload }) {
    try {
        const response = yield call(requestOrderProduct, payload);
        if (response.data.status) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleGetOrder({ payload }) {
    console.log(payload);
    try {
        const response = yield call(requestGetOrder, payload);
        if (response.data.status) {
            yield put(dnUpdateOrder({ orders: response.data.result }));
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleDNReceiveOrder({ payload }) {
    try {
        const response = yield call(requestReceive, payload);
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } catch (error) {
        console.log(error);
    }
}
function* handleDNGetIntro({ payload }) {
    try {
        const response = yield call(requestDNGetIntro, payload);
        if (response.data.status) {
            yield put(dnUpdateIntro({ intro: response.data.result }));
        }
    } catch (error) {
        console.log(error);
    }
}
export {
    handleDNCreateProduct,
    handleAddToCart,
    handleGetCart,
    handleUpdateCartItem,
    handleDNOrderProduct,
    handleGetOrder,
    handleDNReceiveOrder,
    handleDNGetIntro,
};
