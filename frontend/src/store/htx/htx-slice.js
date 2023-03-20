import { createSlice } from "@reduxjs/toolkit";
const htxSlice = createSlice({
    name: "htx",
    initialState: {
        introProduct: [],
    },
    reducers: {
        htxUpdateInfo: (state, action) => {},
        htxUploadImage: (state, action) => {},
        htxUploadImages: (state, action) => {},
        htxCreateProduct: (state, action) => {},
    },
});

export const {
    htxCreateProduct,
    htxUpdateInfo,
    htxUploadImage,
    htxUploadImages,
} = htxSlice.actions;
export default htxSlice.reducer;
