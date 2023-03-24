import { call, put } from "redux-saga/effects";
import {
    requestDNGetOrder,
    requestGetCategory,
    requestGetProducts,
    requestGetUnitDetail,
    requestHTXGetOrder,
} from "./product-requests";
import {
    productUpdateCategory,
    productUpdateDetailUnit,
    productUpdateProducts,
    updateOrders,
} from "./product-slice";

function* handleGetCategory() {
    try {
        const response = yield call(requestGetCategory);
        if (response.data.status) {
            yield put(
                productUpdateCategory({ category: response.data.result })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleGetProducts() {
    try {
        const response = yield call(requestGetProducts);
        if (response.data.status) {
            yield put(
                productUpdateProducts({ products: response.data.result })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleGetUnitDetail({ payload }) {
    try {
        const response = yield call(requestGetUnitDetail, payload);
        if (response.data.status) {
            yield put(
                productUpdateDetailUnit({ detailUnit: response.data.result })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleDNGetOrder({ payload }) {
    try {
        const response = yield call(requestDNGetOrder, payload);
        if (response.data.status) {
            yield put(updateOrders({ orders: response.data.result }));
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
function* handleHTXGetOrder({ payload }) {
    try {
        const response = yield call(requestHTXGetOrder, payload);
        if (response.data.status) {
            yield put(updateOrders({ orders: response.data.result }));
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
export {
    handleGetCategory,
    handleGetProducts,
    handleGetUnitDetail,
    handleDNGetOrder,
    handleHTXGetOrder,
};
