import React from "react";

const OrderAddress = () => {
    return (
        <div className="address-list ">
            <div className="info-products-order relative mx-auto box-shadow-custom px-2 pt-1 pb-4 rounded-md">
                <div className="absolute cursor-pointer top-0 -right-2 w-8 h-8">
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="item-name text-lg font-bold my-2">
                    <span>Thông Tin Giao Hàng</span>
                </div>

                <div className="flex justify-between my-1">
                    <div className="item-phone">
                        <img
                            src="/images/phone.png"
                            alt=""
                            className="w-5 h-5 inline-block mr-1"
                        />
                        <span>0939393837</span>
                    </div>
                    <div className="item-email">
                        <img
                            src="/images/mail.png"
                            alt=""
                            className="w-5 h-5 inline-block mr-1"
                        />
                        <span>tinhgiathanhhoa@gmail.com</span>
                    </div>
                </div>
                <div className="item-address">
                    <span className="text-red-700 font-bold">
                        Địa chỉ giao hàng:{" "}
                    </span>
                    <span>
                        125, tỉnh lô 8A, ấp Nhơn Hội, xã Nhơn Nghĩa, huyện Bình
                        Liêu, tỉnh Nghệ An
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderAddress;
