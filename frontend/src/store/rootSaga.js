import { all, fork } from "redux-saga/effects";
import addressSaga from "./address/address-saga";
import authSaga from "./auth/auth-saga";
import userSaga from "./user/user-saga.jsx";
import htxSaga from "./htx/htx-saga.js";
import productSaga from "./products/product-saga";
import dnSaga from "./dn/dn-saga";
export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
        fork(addressSaga),
        fork(htxSaga),
        fork(productSaga),
        fork(dnSaga),
    ]);
}
