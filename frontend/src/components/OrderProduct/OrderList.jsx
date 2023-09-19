import React, { Fragment, useState } from "react";
import OrderItem from "./OrderItem";
import OrderAddress from "./OrderAddress";
import { useSelector } from "react-redux";
const OrderList = ({ infoShip, setInfoShip, setOrderPrice, setPayPrice }) => {
    const { cart, updateCartItem, orderProduct } = useSelector(
        (state) => state.dn
    );
    const { userUnit } = useSelector((state) => state.auth);

    const orderListProduct = cart.filter((item) => {
        for (let i = 0; i < orderProduct.length; i++) {
            if (item.SP_MaSP === orderProduct[i])
                return item.SP_MaSP === orderProduct[i];
        }
    });

    const data = () => {
        const orderList = [];
        orderListProduct.map((item) => {
            if (orderList.length === 0) {
                orderList.push({ [item.DV_MaDV]: [item] });
            } else {
                let i = 0;
                for (i; i < orderList.length; ++i) {
                    const key = Object.keys(orderList[i])[0];
                    const value = orderList[i][item.DV_MaDV];
                    if (key === item.DV_MaDV) {
                        orderList[i][item.DV_MaDV] = [...value, item];
                        break;
                    }
                }
                if (i === orderList.length) {
                    orderList.push({ [item.DV_MaDV]: [item] });
                }
            }
        });
        return orderList;
    };
    return (
        <div className="order-list my-4 ">
            <div className="info-products-order my-4 w-[90%] mx-auto grid grid-cols-12 gap-5">
                <div className="col-span-8">
                    {data().map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="mb-2 flex gap-5 items-center">
                                    <div className="logo w-10 h-10 border-[2px] border-primary-color rounded-full overflow-hidden">
                                        <img
                                            src={
                                                item[Object.keys(item)[0]][0]
                                                    .DV_Logo
                                            }
                                            alt=""
                                            className="w-10 h-10 object-cover"
                                        />
                                    </div>
                                    <div className="text-lg font-bold">
                                        {
                                            item[Object.keys(item)[0]][0]
                                                .DV_TenDonVi
                                        }
                                    </div>
                                </div>
                                <div className="ml-10">
                                    {item[Object.keys(item)[0]].map(
                                        (data, index) => (
                                            <div
                                                className="relative"
                                                key={index}
                                            >
                                                <OrderItem
                                                    edit={false}
                                                    data={data}
                                                    type="order"
                                                    ship={infoShip[index]}
                                                    setInfoShip={setInfoShip}
                                                    infoShip={infoShip}
                                                    index={index}
                                                    setOrderPrice={
                                                        setOrderPrice
                                                    }
                                                    setPayPrice={setPayPrice}
                                                ></OrderItem>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
