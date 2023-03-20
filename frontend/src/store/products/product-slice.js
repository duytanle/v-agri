import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        category: [],
        products: [],
        currentProducts: [],
        productDetail: {},
        detailUnit: {},
    },
    reducers: {
        productGetCategory: (state, action) => {},
        productGetProducts: (state, action) => {},
        productUpdateCategory: (state, action) => ({
            ...state,
            category: action.payload.category,
        }),
        productUpdateProducts: (state, action) => ({
            ...state,
            products: action.payload.products,
        }),
        productUpdateProductDetail: (state, action) => ({
            ...state,
            productDetail: action.payload.productDetail,
        }),
        productUpdateDetailUnit: (state, action) => ({
            ...state,
            detailUnit: action.payload.detailUnit,
        }),
        productUpdateCurrentProducts: (state, action) => ({
            ...state,
            currentProducts: action.payload.currentProducts,
        }),
    },
});

export const {
    productGetCategory,
    productGetProducts,
    productUpdateProducts,
    productUpdateCategory,
    productUpdateProductDetail,
    productUpdateDetailUnit,
    productUpdateCurrentProducts,
} = productSlice.actions;
export default productSlice.reducer;
