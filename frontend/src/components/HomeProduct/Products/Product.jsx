import React from "react";
import "./Product.css";
import ProductStandard from "./ProductStandard";
const Product = ({ data, customProduct = "", onView, ...props }) => {
    const standardColor = {
        OCOP: "[#FF78F0]",
        VietGAP: "[#2DCDDF]",
        GlobalGAP: "orange-500",
    };
    const checkKM = () => {
        if (!data.KM_MaKM) {
            return false;
        } else {
            const startDate = data.KM_NgayBatDau?.split("/") || "";
            const newStartDate = new Date(
                startDate[1] + "/" + startDate[0] + "/" + startDate[2]
            );
            const endDate = data.KM_NgayKetThuc?.split("/") || "";
            const newEndDate = new Date(
                endDate[1] + "/" + endDate[0] + "/" + endDate[2]
            );
            return newStartDate <= new Date() && new Date() <= newEndDate;
        }
    };
    return (
        <div
            className={`product  w-full border-2 ${
                data.LSP_MaLSP === "HTX"
                    ? "border-primary-color"
                    : "border-secondary-color"
            } rounded-xl cursor-pointer relative box-shadow-custom  ${
                customProduct ? customProduct : "h-[275px]"
            }`}
            onClick={() => {
                onView();
            }}
        >
            <div className="product-image h-[60%] ">
                <img
                    src={data.SP_AnhDaiDien}
                    alt=""
                    className=" h-full w-full object-cover rounded-t-[10px] "
                />
            </div>
            <div className="product-info p-2 flex flex-col  h-[40%]">
                <div
                    className={`product-name font-bold text-2-line ${
                        props.customTSP
                            ? props.customTSP
                            : "leading-5  text-[18px] h-[45px]"
                    }`}
                >
                    {data.SP_TenSanPham}
                </div>
                {data.LSP_MaLSP === "DN" ? (
                    <>
                        <div className="product-demand flex justify-between text-[16px]">
                            <div className="font-bold">Nhu cầu: </div>
                            <div className="flex gap-2 text-primary-color font-bold">
                                <div className="product-number">
                                    {data.SP_SoLuongCungCau} /
                                </div>
                                <div className="product-cycle">
                                    {data.SP_ChuKyCungCau}
                                </div>
                            </div>
                            <div className="h-[55px]"></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="product-price flex items-center justify-between">
                            {checkKM() ? (
                                <>
                                    <div className="price-decrease  text-red-600 font-bold text-[16px]">
                                        <span className="text-[18px]">
                                            {(
                                                (data.GSP_Gia *
                                                    (100 - data.KM_PhanTram)) /
                                                100
                                            )
                                                .toString()
                                                .replace(
                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                    "$1."
                                                )}
                                            vnđ
                                        </span>
                                    </div>
                                    <div className="price-decrease text-gray-600 font-bold text-[18px] line-through">
                                        <span className="">
                                            {data.GSP_Gia.toString().replace(
                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                "$1."
                                            )}
                                            vnđ
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="price-decrease  text-red-600 font-bold text-[18px] ">
                                    <span>
                                        {data.GSP_Gia.toString().replace(
                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                            "$1."
                                        )}
                                        vnđ
                                    </span>
                                </div>
                            )}
                        </div>
                        <ProductStandard
                            standards={data.SP_Chuan?.split(", ")}
                            standardColor={standardColor}
                        ></ProductStandard>
                    </>
                )}
            </div>
            {checkKM() ? (
                <div className="product-sale absolute top-2 -left-[10px] bg-red-700 text-white rounded-sm text-sm px-[5px]">
                    <span className="font-bold"> Giảm {data.KM_PhanTram}%</span>
                    <div className="sale-triangle absolute border-[4px] top-[19px] left-[1px]"></div>
                </div>
            ) : null}
        </div>
    );
};

export default Product;
