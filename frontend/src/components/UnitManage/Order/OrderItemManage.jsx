import React, { useEffect, useState } from "react";

const OrderItemManage = ({ data }) => {
    const timesReceiving = () => {
        const orderTime = data.CTDH_ThoiHan.split(" ");
        const cycleReceiving = data.CTDH_ChuKyNhan.split(" ");
        switch (orderTime[1]) {
            case "năm": {
                if (cycleReceiving[1] === "năm")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );

                if (cycleReceiving[1] === "tháng")
                    return (
                        (parseFloat(orderTime[0]) * 12) /
                        parseFloat(cycleReceiving[0])
                    );
                if (cycleReceiving[1] === "ngày")
                    return (
                        (parseFloat(orderTime[0]) * 365) /
                        parseFloat(cycleReceiving[0])
                    );
                break;
            }
            case "tháng": {
                if (cycleReceiving[1] === "tháng")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );
                if (cycleReceiving[1] === "ngày")
                    return (
                        (parseFloat(orderTime[0]) * 30) /
                        parseFloat(cycleReceiving[0])
                    );
                break;
            }
            case "ngày": {
                if (cycleReceiving[1] === "ngày")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );
                break;
            }
        }
    };
    const calculatePrice = () => {
        const times = Math.floor(timesReceiving());
        const soluong = data.CTDH_SoLuong.split(" ");
        const phanTram = data.KM_PhanTram;
        const phanTramString = phanTram ? `*${100 - phanTram} %` : ``;
        let price = 1;
        if (data.GSP_DonViTinh !== soluong[1]) {
            if (soluong[1] === "kg") {
                price = (
                    ((parseFloat(soluong[0]) * data.GSP_Gia) / 1000) *
                    times *
                    (phanTram ? (100 - phanTram) / 100 : 1)
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) / 1000 * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
            } else {
                price = (
                    parseFloat(soluong[0]) *
                    data.GSP_Gia *
                    1000 *
                    times *
                    (phanTram ? (100 - phanTram) / 100 : 1)
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) * 1000 * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
            }
        } else {
            price = (
                parseFloat(soluong[0]) *
                data.GSP_Gia *
                times *
                (phanTram ? (100 - phanTram) / 100 : 1)
            )
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

            return `${soluong[0]} (${soluong[1]}) * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
        }
    };

    return (
        <div className="order-item relative w-full flex items-center gap-4 box-shadow-custom rounded-lg px-4 py-3 mb-4 cursor-pointer">
            <div className="product-img w-[100px] h-[100px] rounded-lg overflow-hidden">
                <img
                    src={data.SP_AnhDaiDien}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="product-info-order flex-1 relative">
                <div className="name text-lg font-bold mb-2">
                    {data.SP_TenSanPham}
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <div className="price mb-1">
                            <span className="price-title font-bold">
                                Đơn giá:&nbsp;
                            </span>
                            <span className="price-number">
                                {data.GSP_Gia}&nbsp;/&nbsp;
                                {data.GSP_DonViTinh}
                            </span>
                        </div>
                        <div className="amount">
                            <span className="amount-title font-bold">
                                Số lượng đặt:&nbsp;
                            </span>
                            <span className="amount-number">
                                {data.CTDH_SoLuong}&nbsp;/&nbsp;
                                {data.CTDH_ChuKyNhan}
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="time mb-1">
                            <span className="time-title font-bold">
                                Thời hạn đơn hàng:&nbsp;
                            </span>
                            <span className="time-number">
                                {data.CTDH_ThoiHan}
                            </span>
                        </div>
                        <div className="date">
                            <span className="date-title font-bold">
                                Ngày bắt đầu nhận hàng:&nbsp;
                            </span>
                            <span className="date-number">
                                {data.CTDH_NgayNhan.split("-")
                                    .reverse()
                                    .join("-")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="notice font-bold mt-1">
                    <span>Thành tiền:&nbsp;</span>
                    <span className="text-red-700">{calculatePrice()}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderItemManage;
