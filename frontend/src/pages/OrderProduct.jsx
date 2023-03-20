import React, { useEffect } from "react";
import "../components/OrderProduct/OrderProduct.css";
import OrderList from "../components/OrderProduct/OrderList";
import OrderPayment from "../components/OrderProduct/OrderPayment";
import { useSelector } from "react-redux";
const OrderProduct = () => {
    const { orderProduct, products } = useSelector((state) => state.dn);
    useEffect(() => {
        if (orderProduct.length == 0) {
            window.history.back();
        }
    }, []);
    return (
        <div className="h-screen pt-[100px] px-8 rounded-lg box-shadow-custom">
            <div className="order-info  grid grid-cols-12 gap-5 ">
                <div className="info col-span-12 box-shadow-custom rounded-lg px-4 py-3 h-[55vh] max-h-[55vh] overflow-y-scroll ">
                    <div className="info-title text-2xl font-bold">
                        Thông tin đơn hàng
                    </div>
                    <div className="info-list-order">
                        <OrderList></OrderList>
                    </div>
                </div>

                <div className="payment col-span-8 box-shadow-custom rounded-lg px-4 py-3 h-[25vh] max-h-[25vh]">
                    <OrderPayment></OrderPayment>
                </div>
                <div className="order-confirm col-span-4 box-shadow-custom rounded-lg px-4 py-3 h-[25vh] max-h-[25vh]">
                    <div className="order-confirm-title text-2xl font-bold">
                        Thanh toán
                    </div>
                    <div className="flex justify-between text-lg my-6">
                        <span className="font-bold">Tổng giá trị: </span>
                        <span className="text-red-700 font-bold">
                            1.500.000.000đ
                        </span>
                    </div>
                    <div className="text-center">
                        <button className="px-5 py-3 outline-none bg-primary-color hover:bg-hover-priColor text-white font-bold text-xl rounded-lg">
                            Đặt mua
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
