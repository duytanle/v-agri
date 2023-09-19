import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderListManage from "./OrderListManage";
import queryString from "query-string";
const OrderManage = () => {
    const [tab, setTab] = useState("allOrder");
    const { user, userUnit, accessToken } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    return (
        <div className="order-list mt-4 ">
            <div className="setting-tabs flex flex-col h-[580px] relative pt-2">
                <div className="title-tabs grid grid-cols-5 gap-5">
                    <button
                        className={` py-3  text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                            tab === "allOrder"
                                ? "bg-white text-black active-tabs"
                                : "text-white"
                        }`}
                        onClick={() => setTab("allOrder")}
                    >
                        Tất cả đơn hàng
                    </button>
                    <button
                        className={` py-3  text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                            tab === "orderConfirm"
                                ? "bg-white text-black active-tabs"
                                : "text-white"
                        }`}
                        onClick={() => setTab("orderConfirm")}
                    >
                        Chờ xác nhận
                    </button>

                    <button
                        className={` py-3  text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                            tab === "orderProcessing"
                                ? "bg-white text-black active-tabs"
                                : "text-white"
                        }`}
                        onClick={() => setTab("orderProcessing")}
                    >
                        Đang thực hiện
                    </button>
                    <button
                        className={` py-3  text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                            tab === "orderCancel"
                                ? "bg-white text-black active-tabs"
                                : "text-white"
                        }`}
                        onClick={() => setTab("orderCancel")}
                    >
                        Đã hủy
                    </button>
                    <button
                        className={` py-3  text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                            tab === "orderFinished"
                                ? "bg-white text-black active-tabs"
                                : "text-white"
                        }`}
                        onClick={() => setTab("orderFinished")}
                    >
                        Đã hoàn thành
                    </button>
                </div>

                <div className="content-tabs w-full h-full mt-5">
                    <div
                        className={` order-all w-full h-full  ${
                            tab === "allOrder"
                                ? "block animate__animated animate__fadeIn"
                                : "hidden"
                        }`}
                    >
                        <div className="w-full h-full box-shadow-custom rounded-xl">
                            <OrderListManage
                                tab={tab}
                                orderList={orders.filter(
                                    (item) => item.TTDH_MaTTDH !== "CTT"
                                )}
                            ></OrderListManage>
                        </div>
                    </div>

                    <div
                        className={` order-confirm w-full h-full  ${
                            tab === "orderConfirm"
                                ? "block animate__animated animate__fadeIn"
                                : "hidden"
                        }`}
                    >
                        <div className="w-full h-full box-shadow-custom rounded-xl">
                            <OrderListManage
                                tab={tab}
                                orderList={orders.filter(
                                    (item) => item.TTDH_MaTTDH === "CXN"
                                )}
                            ></OrderListManage>
                        </div>
                    </div>

                    <div
                        className={` order-processing w-full h-full  ${
                            tab === "orderProcessing"
                                ? "block animate__animated animate__fadeIn"
                                : "hidden"
                        }`}
                    >
                        <div className="w-full h-full box-shadow-custom rounded-xl">
                            <OrderListManage
                                tab={tab}
                                orderList={orders.filter(
                                    (item) =>
                                        item.TTDH_MaTTDH.search("DTH") > -1
                                )}
                            ></OrderListManage>
                        </div>
                    </div>
                    <div
                        className={` order-cancel w-full h-full  ${
                            tab === "orderCancel"
                                ? "block animate__animated animate__fadeIn"
                                : "hidden"
                        }`}
                    >
                        <div className="w-full h-full box-shadow-custom rounded-xl">
                            <OrderListManage
                                tab={tab}
                                orderList={orders.filter(
                                    (item) => item.TTDH_MaTTDH === "HUY"
                                )}
                            ></OrderListManage>
                        </div>
                    </div>
                    <div
                        className={` order-finished  w-full h-full  ${
                            tab === "orderFinished"
                                ? "block animate__animated animate__fadeIn"
                                : "hidden"
                        }`}
                    >
                        <div className="w-full h-full box-shadow-custom rounded-xl">
                            <OrderListManage
                                tab={tab}
                                orderList={orders.filter(
                                    (item) => item.TTDH_MaTTDH === "DHT"
                                )}
                            ></OrderListManage>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManage;
