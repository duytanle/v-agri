import { take, takeLatest } from "redux-saga/effects";
import {
    handleAddToCart,
    handleDNCreateProduct,
    handleDNGetIntro,
    handleDNOrderProduct,
    handleDNReceiveOrder,
    handleGetCart,
    handleUpdateCartItem,
} from "./dn-handlers";
import { dnCreateProduct } from "./dn-slice";

export default function* dnSaga() {
    yield takeLatest(dnCreateProduct.type, handleDNCreateProduct);
    yield takeLatest("DN_ADD_TO_CART", handleAddToCart);
    yield takeLatest("GET_CART", handleGetCart);
    yield takeLatest("UPDATE_CART_ITEM", handleUpdateCartItem);
    yield takeLatest("ORDER_PRODUCT", handleDNOrderProduct);
    yield takeLatest("DN_RECEIVE_ORDER", handleDNReceiveOrder);
    yield takeLatest("DN_GET_INTRO", handleDNGetIntro);
}
