import { takeLatest } from "redux-saga/effects";
import {
    handleDNGetOrder,
    handleGetCategory,
    handleGetProductDetail,
    handleGetProducts,
    handleGetUnitDetail,
    handleGetUnitProduct,
    handleHTXGetOrder,
} from "./product-handlers";
import { productGetCategory, productGetProducts } from "./product-slice";

export default function* productSaga() {
    yield takeLatest(productGetCategory.type, handleGetCategory);
    yield takeLatest("GET_PRODUCT", handleGetProducts);
    yield takeLatest("COMMON_GET_UNIT_DETAIL", handleGetUnitDetail);
    yield takeLatest("DN_GET_ORDER", handleDNGetOrder);
    yield takeLatest("HTX_GET_ORDER", handleHTXGetOrder);
    yield takeLatest("COMMON_GET_UNIT_PRODUCT", handleGetUnitProduct);
    yield takeLatest("COMMON_GET_PRODUCT_DETAIL", handleGetProductDetail);
}
