import React, { useEffect } from "react";
import Filter from "../components/HomeProduct/Filter";
import Category from "../components/HomeProduct/Category";
import Products from "../components/HomeProduct/Products";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productUpdateCurrentProducts } from "../store/products/product-slice";
import { useNavigate } from "react-router-dom";
import { updateAlan } from "../store/alanai/alan-slice";
import { toast } from "react-toastify";

const HomeProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const { products, currentProducts } = useSelector((state) => state.product);
    const { command, checkVoice } = useSelector((state) => state.alan);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let currentProducts = JSON.parse(JSON.stringify(products));
        if (user) {
            currentProducts = products.filter(
                (item) => item.LSP_MaLSP !== user.LND_MaLND
            );
        }
        dispatch(productUpdateCurrentProducts({ currentProducts }));
    }, [products]);

    useEffect(() => {
        if (Object.keys(command).length > 0) {
            switch (command.COMMAND) {
                case "XEM_SAN_PHAM": {
                    navigate(
                        `/chi_tiet_san_pham/${
                            currentProducts[command.value - 1].SP_MaSP
                        }`
                    );
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
                <Category></Category>
            </div>
            <div className="col-span-5">
                <Filter customFilter="ml-[50px]"></Filter>
                <Products></Products>
            </div>
        </div>
    );
};

export default HomeProduct;
