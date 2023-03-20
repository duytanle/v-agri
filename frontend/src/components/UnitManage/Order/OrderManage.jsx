import React from "react";
import OrderAddress from "../../OrderProduct/OrderAddress";
import OrderItem from "../../OrderProduct/OrderItem";

const OrderManage = () => {
    return (
        <div className="order-list my-4 ">
            <div className="info-unit flex gap-3 items-center">
                <div className="unit-avatar w-6 h-6 border-2 border-primary-color rounded-full">
                    <img
                        src="/images/non-text-logo.png"
                        alt=""
                        className="w-full h-full"
                    />
                </div>
                <div className="unit-name font-bold text-lg">
                    HTX Tiên Lãng Hải Phòng
                </div>
            </div>
            <div className="info-products-order my-2 w-[90%] mx-auto grid grid-cols-12 gap-5">
                <div className="col-span-7">
                    <OrderItem></OrderItem>
                    <OrderItem></OrderItem>
                </div>
                <div className="col-span-5 flex flex-col gap-4">
                    <OrderAddress></OrderAddress>
                    <OrderAddress></OrderAddress>
                </div>
            </div>
        </div>
    );
};

export default OrderManage;
