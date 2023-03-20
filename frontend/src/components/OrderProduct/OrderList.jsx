import React from "react";
import OrderItem from "./OrderItem";
import OrderAddress from "./OrderAddress";
import { useSelector } from "react-redux";
const OrderList = () => {
    const { cart } = useSelector((state) => state.dn);
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
            <div className="info-products-order my-4 w-[90%] mx-auto grid grid-cols-12 gap-5">
                <div className="col-span-8">
                    {cart.map((item) => (
                        <OrderItem data={item} key={item.SP_MaSP}></OrderItem>
                    ))}
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                    <OrderAddress></OrderAddress>
                    <OrderAddress></OrderAddress>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
