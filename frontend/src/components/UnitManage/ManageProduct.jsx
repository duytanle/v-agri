import React, { useEffect, useState } from "react";
import Products from "../HomeProduct/Products";
import Filter from "../HomeProduct/Filter";
import ProductCE from "./ManageProduct/ProductCE";
import { useDispatch, useSelector } from "react-redux";
import ProductFormDN from "./ManageProduct/ProductFormDN";
import {
    productUpdateCurrentProducts,
    productUpdateProductDetail,
} from "../../store/products/product-slice";
import queryString from "query-string";
const ManageProduct = () => {
    const { user, userUnit } = useSelector((state) => state.auth);
    const [addProduct, setAddProduct] = useState(false);
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const listData = [
        { name: "Tất cả", value: "all" },
        { name: "Quản lý sản phẩm", value: "post" },
        { name: "Quản lý đơn hàng", value: "order" },
    ];
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRow: products.length,
    });
    const [filters, setFilters] = useState({
        search: "",
        unitID: userUnit.DV_MaDV,
        type: user.LND_MaLND === "HTX" ? "DN" : "HTX",
        productNew: "",
        productTop: false,
        productStandard: "all",
        productPrice: "",
        category: "",
    });
    useEffect(() => {
        const currentProducts = products.filter(
            (item) => item.DV_MaDV === userUnit.DV_MaDV
        );
        dispatch(productUpdateCurrentProducts({ currentProducts }));
    }, []);
    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: queryString.stringify(filters),
        });
    }, [filters]);

    useEffect(() => {
        setPagination({ ...pagination, totalRow: products.length });
    }, [products]);
    return (
        <div
            className={`setting py-3 px-5 ${addProduct ? "h-max" : "h-full"} `}
        >
            <div className=" font-bold text-2xl ">Quản lý sản phẩm</div>
            {addProduct ? (
                user.LND_MaLND === "HTX" ? (
                    <ProductCE
                        handleCloseAdd={() => setAddProduct(false)}
                        edit={true}
                    ></ProductCE>
                ) : (
                    <ProductFormDN
                        handleCloseAdd={() => setAddProduct(false)}
                    ></ProductFormDN>
                )
            ) : (
                <>
                    <Filter
                        customFilter="ml-3"
                        pagination={pagination}
                        setPagination={setPagination}
                        filters={filters}
                        setFilters={setFilters}
                    >
                        <div
                            className="w-10 h-10 bg-primary-color rounded-full mr-2 flex justify-center items-center text-white font-bold text-lg cursor-pointer hover:bg-hover-priColor"
                            onClick={() => {
                                setAddProduct(!addProduct);
                                dispatch(
                                    productUpdateProductDetail({
                                        productDetail: {},
                                    })
                                );
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </Filter>
                    <Products
                        customProducts="grid-cols-5 gap-4"
                        customProduct="h-[250px]"
                        customTSP="leading-4 h-[35px]"
                        onView={() => {
                            setAddProduct(true);
                        }}
                        pagination={pagination}
                    ></Products>
                </>
            )}
        </div>
    );
};

export default ManageProduct;
