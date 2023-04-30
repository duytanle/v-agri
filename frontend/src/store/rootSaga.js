import { all, fork } from "redux-saga/effects";
import addressSaga from "./address/address-saga";
import authSaga from "./auth/auth-saga";
import accountSaga from "./account/account-saga.jsx";
import htxSaga from "./htx/htx-saga.js";
import productSaga from "./products/product-saga";
import dnSaga from "./dn/dn-saga";
import commonSaga from "./common/common-saga";
import postSaga from "./post/post-saga";
export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(accountSaga),
        fork(addressSaga),
        fork(htxSaga),
        fork(productSaga),
        fork(dnSaga),
        fork(commonSaga),
        fork(postSaga),
    ]);
}
