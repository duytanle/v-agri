import { takeLatest } from "redux-saga/effects";
import { handleHTXCreateProduct, handleHTXUpdateInfo } from "./htx-handler";
import { htxCreateProduct, htxUpdateInfo } from "./htx-slice";

export default function* htxSaga() {
    yield takeLatest(htxUpdateInfo.type, handleHTXUpdateInfo);
    yield takeLatest(htxCreateProduct.type, handleHTXCreateProduct);
}
