import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice.jsx";
import userReducer from "./user/user-slice.jsx";
import addressReducer from "./address/address-slice.js";
import htxReducer from "./htx/htx-slice.js";
import productReducer from "./products/product-slice.js";
import dnReducer from "./dn/dn-slice.js";
export const reducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    address: addressReducer,
    htx: htxReducer,
    product: productReducer,
    dn: dnReducer,
});
