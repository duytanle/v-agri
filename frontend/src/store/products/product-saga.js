import { takeLatest } from "redux-saga/effects";
import {
    handleDNGetOrder,
    handleGetCategory,
    handleGetProducts,
    handleGetUnitDetail,
    handleHTXGetOrder,
} from "./product-handlers";
import { productGetCategory, productGetProducts } from "./product-slice";

export default function* productSaga() {
    yield takeLatest(productGetCategory.type, handleGetCategory);
    yield takeLatest(productGetProducts.type, handleGetProducts);
    yield takeLatest("COMMON_GET_UNIT_DETAIL", handleGetUnitDetail);
    yield takeLatest("DN_GET_ORDER", handleDNGetOrder);
    yield takeLatest("HTX_GET_ORDER", handleHTXGetOrder);
}
