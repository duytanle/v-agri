import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice.jsx";
import accountReducer from "./account/account-slice.jsx";
import addressReducer from "./address/address-slice.js";
import htxReducer from "./htx/htx-slice.js";
import productReducer from "./products/product-slice.js";
import dnReducer from "./dn/dn-slice.js";
import alanReducer from "./alanai/alan-slice.js";
import commonReducer from "./common/common-slice.js";
import postReducer from "./post/post-slice.js";
export const reducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    address: addressReducer,
    htx: htxReducer,
    product: productReducer,
    dn: dnReducer,
    alan: alanReducer,
    common: commonReducer,
    post: postReducer,
});
