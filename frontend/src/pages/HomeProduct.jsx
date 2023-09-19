import React, { useEffect, useState } from "react";
import Filter from "../components/HomeProduct/Filter";
import Category from "../components/HomeProduct/Category";
import Products from "../components/HomeProduct/Products";
import { useDispatch, useSelector } from "react-redux";
import { productUpdateCurrentProducts } from "../store/products/product-slice";
import { useNavigate } from "react-router-dom";
import { updateAlan } from "../store/alanai/alan-slice";
import { toast } from "react-toastify";
import queryString from "query-string";
const HomeProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const { products, currentProducts } = useSelector((state) => state.product);
    const { command, checkVoice } = useSelector((state) => state.alan);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRow: products.length,
    });
    const [filters, setFilters] = useState({
        search: "",
        unitID: "",
        type: "all",
        productNew: "",
        productTop: false,
        productStandard: "all",
        productPrice: "",
        category: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: queryString.stringify(filters),
        });
    }, [filters]);
    useEffect(() => {
        if (user) {
            setFilters({ ...filters, type: user.LND_MaLND });
            dispatch({
                type: "GET_PRODUCT",
                payload: queryString.stringify({
                    ...filters,
                    type: user?.LND_MaLND,
                }),
            });
        }
    }, [user]);
    useEffect(() => {
        if (user) {
            setFilters({ ...filters, type: user.LND_MaLND });
        } else {
            setFilters({ ...filters, type: "all" });
        }
    }, [user]);
    useEffect(() => {
        setPagination({ ...pagination, totalRow: products.length });
    }, [products]);
    useEffect(() => {
        if (Object.keys(command).length > 0) {
            switch (command.COMMAND) {
                case "XEM_SAN_PHAM": {
                    if (command.value === -1) {
                        navigate(
                            `/chi_tiet_san_pham/${
                                products[products.length - 1].SP_MaSP
                            }`
                        );
                    } else {
                        navigate(
                            `/chi_tiet_san_pham/${
                                products[command.value - 1].SP_MaSP
                            }`
                        );
                    }
                    break;
                }
                default: {
                    toast.warn("Không hiểu câu lệnh", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    break;
                }
            }
            dispatch(updateAlan({}));
        }
    }, [checkVoice]);
    return (
        <div className="h-screen pt-[80px] px-8 grid grid-cols-6 gap-12 ">
            <div className="">
                <Category setFilters={setFilters} filters={filters}></Category>
            </div>
            <div className="col-span-5">
                <Filter
                    customFilter="ml-[50px]"
                    pagination={pagination}
                    setPagination={setPagination}
                    filters={filters}
                    setFilters={setFilters}
                ></Filter>
                <Products pagination={pagination}></Products>
            </div>
        </div>
    );
};

export default HomeProduct;
