import React, { useEffect } from "react";
import Product from "./Products/Product";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    productUpdateCurrentProducts,
    productUpdateProductDetail,
} from "../../store/products/product-slice";
import { dnUpdateManageProduct } from "../../store/dn/dn-slice";

const Products = ({
    customProducts = "",
    customProduct = "",
    customTSP = "",
    pagination,
    ...props
}) => {
    const standards = [
        { id: "OCOP", name: "OCOP" },
        { id: "VG", name: "VietGAP" },
        { id: "GBG", name: "GlobalGAP" },
    ];

    const { products, currentProducts } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleViewEdit = (data) => {
        if (props?.onView) {
            props.onView();
            dispatch(productUpdateProductDetail({ productDetail: data }));
        } else {
            navigate(`/chi_tiet_san_pham/${data.SP_MaSP}`);
        }
    };
    return (
        <div
            className={`products grid mt-7 ${
                customProducts ? customProducts : "grid-cols-5 gap-6 "
            }`}
        >
            {products
                .slice(pagination.page * 10 - 10, pagination.page * 10)
                ?.map((data) => (
                    <Product
                        standards={standards}
                        customProduct={customProduct}
                        data={data}
                        customTSP={customTSP}
                        onView={() => {
                            handleViewEdit(data);
                        }}
                        key={data.SP_MaSP}
                    ></Product>
                ))}
        </div>
    );
};

export default Products;
