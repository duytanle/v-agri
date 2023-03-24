import React, { useEffect, useState } from "react";
import "../components/OrderProduct/OrderProduct.css";
import OrderList from "../components/OrderProduct/OrderList";
import OrderPayment from "../components/OrderProduct/OrderPayment";
import { useDispatch, useSelector } from "react-redux";
const OrderProduct = () => {
    const { orderProduct, totalOrder, cart } = useSelector((state) => state.dn);
    const { products } = useSelector((state) => state.product);
    const { userUnit, accessToken } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [infoShip, setInfoShip] = useState([
        ...orderProduct.map((item) => {
            return {
                shipPhone: userUnit.DV_DienThoai,
                shipAddress: userUnit.DV_DiaChi,
                shipDCCT: "",
                shipMaDCCT: userUnit.DCCT_MaDCCT,
                shipMaXP: userUnit.XP_MaXP,
                shipReuse: "",
            };
        }),
    ]);
    const handleOrder = () => {
        let info = [];
        for (let i = 0; i < orderProduct.length; ++i) {
            let productInfo = products?.find(
                (item) => item.SP_MaSP === orderProduct[i]
            );
            if (productInfo) {
                const cartInfo = cart.find(
                    (item) => item.SP_MaSP === orderProduct[i]
                );

                info.push({ ...cartInfo, GSP_MaGSP: productInfo.GSP_MaGSP });
            }
        }

        const data = {
            infoShip,
            totalOrder,
            info,
            DN_MaQL: userUnit.DN_MaQL,
        };

        dispatch({
            type: "ORDER_PRODUCT",
            payload: { token: accessToken, data },
        });
    };
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
                        <OrderList
                            infoShip={infoShip}
                            setInfoShip={setInfoShip}
                        ></OrderList>
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
                            {`${totalOrder
                                .toString()
                                .replace(
                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1."
                                )} đồng`}
                        </span>
                    </div>
                    <div className="text-center">
                        <div
                            className="px-5 py-3 bg-primary-color hover:bg-hover-priColor text-white font-bold text-xl rounded-lg cursor-pointer"
                            onClick={handleOrder}
                        >
                            Đặt mua
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
