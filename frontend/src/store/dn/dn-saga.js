import { takeLatest } from "redux-saga/effects";
import {
    handleAddToCart,
    handleDNCreateProduct,
    handleGetCart,
    handleUpdateCartItem,
} from "./dn-handlers";
import { dnCreateProduct } from "./dn-slice";

export default function* dnSaga() {
    yield takeLatest(dnCreateProduct.type, handleDNCreateProduct);
    yield takeLatest("ADD_TO_CART", handleAddToCart);
    yield takeLatest("GET_CART", handleGetCart);
    yield takeLatest("UPDATE_CART_ITEM", handleUpdateCartItem);
}
