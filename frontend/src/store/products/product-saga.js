import { takeLatest } from "redux-saga/effects";
import {
    handleGetCategory,
    handleGetProducts,
    handleGetUnitDetail,
} from "./product-handlers";
import { productGetCategory, productGetProducts } from "./product-slice";

export default function* productSaga() {
    yield takeLatest(productGetCategory.type, handleGetCategory);
    yield takeLatest(productGetProducts.type, handleGetProducts);
    yield takeLatest("COMMON_GET_UNIT_DETAIL", handleGetUnitDetail);
}
