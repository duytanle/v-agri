import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "./OrderDetail";
import OrderItemManage from "./OrderItemManage";

const OrderListManage = ({ orderList, tab }) => {
    const [showDetail, setShowDetail] = useState({});
    const { user, userUnit, accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const data = () => {
        const orderListByUnit = [];
        orderList.map((item) => {
            if (orderListByUnit.length === 0) {
                orderListByUnit.push({ [item.DV_MaDV]: [item] });
            } else {
                for (let i = 0; i < orderListByUnit.length; ++i) {
                    const value = orderListByUnit[i][item.DV_MaDV];
                    if (value) {
                        orderListByUnit[i][item.DV_MaDV] = [...value, item];
                    } else {
                        orderListByUnit.push({ [item.DV_MaDV]: [item] });
                    }
                }
            }
        });
        return orderListByUnit;
    };
    const handleShowDetail = (data) => {
        setShowDetail(data);
    };
    useEffect(() => {
        if (user.LND_MaLND === "DN") {
            dispatch({
                type: "DN_GET_ORDER",
                payload: { token: accessToken, DN_MaQL: userUnit.DN_MaQL },
            });
        }
        if (user.LND_MaLND === "HTX") {
            dispatch({
                type: "HTX_GET_ORDER",
                payload: { token: accessToken, DV_MaDV: userUnit.DV_MaDV },
            });
        }
    }, []);
    useEffect(() => {
        setShowDetail({});
    }, [tab]);
    return (
        <div
            className={`order-list-manage py-4 px-8 w-full h-full ${
                Object.keys(showDetail).length === 0 ? "overflow-y-scroll" : ""
            } `}
        >
            <div className="info-products-order mt-4 w-full mx-auto">
                {Object.keys(showDetail).length === 0 ? (
                    <div className="">
                        {data().map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="mb-2 flex gap-5 items-center">
                                        <div className="logo w-10 h-10 border-[2px] border-primary-color rounded-full overflow-hidden">
                                            <img
                                                src={
                                                    item[
                                                        Object.keys(item)[0]
                                                    ][0].DV_Logo
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
                                                    onClick={() => {
                                                        handleShowDetail(data);
                                                    }}
                                                >
                                                    <OrderItemManage
                                                        data={data}
                                                    ></OrderItemManage>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                ) : (
                    <OrderDetail
                        data={showDetail}
                        setShowDetail={setShowDetail}
                    ></OrderDetail>
                )}
            </div>
        </div>
    );
};

export default OrderListManage;
