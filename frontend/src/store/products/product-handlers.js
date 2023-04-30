import { call, put } from "redux-saga/effects";
import {
    requestDNGetOrder,
    requestGetCategory,
    requestGetProductDetail,
    requestGetProducts,
    requestGetUnitDetail,
    requestGetUnitProduct,
    requestHTXGetOrder,
} from "./product-requests";
import {
    productUpdateCategory,
    productUpdateCurrentProducts,
    productUpdateDetailUnit,
    productUpdateProductDetail,
    productUpdateProducts,
    updateOrders,
} from "./product-slice";
import { toast } from "react-toastify";
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

function* handleGetProducts({ payload }) {
    try {
        const response = yield call(requestGetProducts, payload);
        if (response.data.status) {
            yield put(
                productUpdateProducts({ products: response.data.result })
            );
        }
        if (response.data.message) {
            toast.info(response.data.message, {
                position: "top-right",
                autoClose: 2200,
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

function* handleGetUnitProduct({ payload }) {
    try {
        const response = yield call(requestGetUnitProduct, payload);
        if (response.data.status) {
            yield put(
                productUpdateCurrentProducts({
                    currentProducts: response.data.result,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}
function* handleGetProductDetail({ payload }) {
    try {
        const response = yield call(requestGetProductDetail, payload);
        if (response.data.status) {
            yield put(
                productUpdateProductDetail({
                    productDetail: response.data.result,
                })
            );
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
    handleGetUnitProduct,
    handleGetProductDetail,
};
