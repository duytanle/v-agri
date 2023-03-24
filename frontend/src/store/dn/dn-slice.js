import { createSlice } from "@reduxjs/toolkit";

const dnSlice = createSlice({
    name: "dn",
    initialState: {
        cart: [],
        updateCartItem: false,
        orderProduct: [],
        totalOrder: 0,
        intro: [],
    },

    reducers: {
        dnCreateProduct: (state, action) => {},
        dnUpdateCart: (state, action) => ({
            ...state,
            cart: action.payload.cart,
        }),
        dnUpdateCartItem: (state, action) => ({
            ...state,
            updateCartItem: !state.updateCartItem,
        }),
        dnUpdateOrderProduct: (state, action) => ({
            ...state,
            orderProduct: action.payload.orderProduct,
        }),
        dnUpdateTotalOrder: (state, action) => ({
            ...state,
            totalOrder: state.totalOrder + action.payload,
        }),
        dnClearTotalOrder: (state, action) => ({
            ...state,
            totalOrder: 0,
        }),
        dnUpdateIntro: (state, action) => ({
            ...state,
            intro: action.payload.intro,
        }),
    },
});

export const {
    dnCreateProduct,
    dnUpdateCart,
    dnUpdateCartItem,
    dnUpdateOrderProduct,
    dnUpdateTotalOrder,
    dnClearTotalOrder,
    dnUpdateIntro,
} = dnSlice.actions;
export default dnSlice.reducer;
