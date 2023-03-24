import { takeLatest } from "redux-saga/effects";
import {
    handleHTXCancelOrder,
    handleHTXConfirmOrder,
    handleHTXCreateProduct,
    handleHTXIntroProduct,
    handleHTXShipOrder,
    handleHTXUpdateInfo,
} from "./htx-handler";
import { htxCreateProduct, htxUpdateInfo } from "./htx-slice";

export default function* htxSaga() {
    yield takeLatest(htxUpdateInfo.type, handleHTXUpdateInfo);
    yield takeLatest(htxCreateProduct.type, handleHTXCreateProduct);
    yield takeLatest("HTX_CONFIRM_ORDER", handleHTXConfirmOrder);
    yield takeLatest("HTX_CANCEL_ORDER", handleHTXCancelOrder);
    yield takeLatest("HTX_SHIP_ORDER", handleHTXShipOrder);
    yield takeLatest("HTX_INTRO_PRODUCT", handleHTXIntroProduct);
}
