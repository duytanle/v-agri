import React, { useEffect } from "react";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import UnitInfo from "../components/ProductDetail/UnitInfo";
import ProductAssess from "../components/ProductDetail/ProductAssess";
import ProductDesc from "../components/ProductDetail/ProductDesc";
import "../components/ProductDetail/ProductDetail.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productUpdateProductDetail } from "../store/products/product-slice";
const ProductDetail = () => {
    const { products, productDetail } = useSelector((state) => state.product);
    const { user, accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const idProduct = useParams().id;

    useEffect(() => {
        dispatch({
            type: "COMMON_GET_PRODUCT_DETAIL",
            payload: idProduct,
        });
    }, []);

    return (
        <div className="h-screen pt-[80px] px-8">
            <ProductInfo></ProductInfo>
            {productDetail?.LSP_MaLSP === "HTX" ? (
                <div className="grid grid-cols-10 gap-5 h-[90vh] pt-[40px] ">
                    <div className="col-span-4 h-full flex flex-col gap-10">
                        <UnitInfo></UnitInfo>
                        <ProductAssess></ProductAssess>
                    </div>
                    <div className="col-span-6 h-full pb-5">
                        <ProductDesc></ProductDesc>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductDetail;
