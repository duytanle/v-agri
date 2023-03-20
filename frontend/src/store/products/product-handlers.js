import { call, put } from "redux-saga/effects";
import {
    requestGetCategory,
    requestGetProducts,
    requestGetUnitDetail,
} from "./product-requests";
import {
    productUpdateCategory,
    productUpdateDetailUnit,
    productUpdateProducts,
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
export { handleGetCategory, handleGetProducts, handleGetUnitDetail };
