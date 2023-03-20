import { takeLatest } from "redux-saga/effects";
import { handleAddressUpdate } from "./address-handlers";
import { addressGet } from "./address-slice";

export default function* addressSaga() {
    yield takeLatest(addressGet.type, handleAddressUpdate);
}
