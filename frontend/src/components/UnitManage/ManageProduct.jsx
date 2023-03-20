import React, { useState } from "react";
import Products from "../HomeProduct/Products";
import Filter from "../HomeProduct/Filter";
import ProductCE from "./ManageProduct/ProductCE";
import { useSelector } from "react-redux";
import ProductFormDN from "./ManageProduct/ProductFormDN";
const ManageProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [addProduct, setAddProduct] = useState(false);

    const listData = [
        { name: "Tất cả", value: "all" },
        { name: "Quản lý sản phẩm", value: "post" },
        { name: "Quản lý đơn hàng", value: "order" },
    ];
    return (
        <div
            className={`setting py-3 px-5 ${addProduct ? "h-max" : "h-full"} `}
        >
            <div className=" font-bold text-2xl ">Quản lý sản phẩm</div>
            {addProduct ? (
                user.LND_MaLND === "HTX" ? (
                    <ProductCE
                        handleCloseAdd={() => setAddProduct(false)}
                    ></ProductCE>
                ) : (
                    <ProductFormDN
                        handleCloseAdd={() => setAddProduct(false)}
                    ></ProductFormDN>
                )
            ) : (
                <>
                    <Filter customFilter="ml-3">
                        <div
                            className="w-10 h-10 bg-primary-color rounded-full mr-2 flex justify-center items-center text-white font-bold text-lg cursor-pointer hover:bg-hover-priColor"
                            onClick={() => {
                                setAddProduct(!addProduct);
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </Filter>
                    <Products
                        customProducts="grid-cols-5 gap-4"
                        customProduct="h-[250px]"
                    ></Products>
                </>
            )}
        </div>
    );
};

export default ManageProduct;
