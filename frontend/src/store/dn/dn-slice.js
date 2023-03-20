import { createSlice } from "@reduxjs/toolkit";

const dnSlice = createSlice({
    name: "dn",
    initialState: {
        cart: [],
        updateCartItem: false,
        orderProduct: [],
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
    },
});

export const {
    dnCreateProduct,
    dnUpdateCart,
    dnUpdateCartItem,
    dnUpdateOrderProduct,
} = dnSlice.actions;
export default dnSlice.reducer;
