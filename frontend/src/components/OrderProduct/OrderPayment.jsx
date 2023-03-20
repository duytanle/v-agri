import React, { useState } from "react";

const OrderPayment = () => {
    const [cod, setCod] = useState(true);
    const handleClickPayment = (event) => {
        {
            event.currentTarget.classList.contains("cod")
                ? setCod(true)
                : setCod(false);
        }
    };
    return (
        <div className="payment">
            <div className="payment-title text-2xl font-bold">
                Phương thức thanh toán
            </div>
            <div className="payment-type mt-3 flex justify-around items-center">
                <div
                    className="cod flex flex-col items-center gap-2 cursor-pointer"
                    onClick={handleClickPayment}
                >
                    <div
                        className={`name h-[80px] w-[130px] rounded-lg  flex justify-center items-center text-white font-bold text-xl ${
                            cod
                                ? "border-primary-color bg-primary-color"
                                : "border-gray-500 bg-gray-500"
                        }`}
                    >
                        Tiền Mặt
                    </div>
                    <div className="desc text-red-700">
                        Thanh toán mỗi khi nhận hàng
                    </div>
                </div>
                <div
                    className="online flex flex-col items-center gap-2 cursor-pointer"
                    onClick={handleClickPayment}
                >
                    <div
                        className={`name h-[80px] w-[130px] rounded-lg   flex justify-center items-center text-white font-bold text-xl text-center ${
                            !cod
                                ? "border-primary-color bg-primary-color"
                                : "border-gray-500 bg-gray-500"
                        }`}
                    >
                        Dùng <br /> Ví Điện Tử
                    </div>
                    <div className="desc text-red-700">
                        Thanh toán online sau khi xác nhận đơn hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPayment;
