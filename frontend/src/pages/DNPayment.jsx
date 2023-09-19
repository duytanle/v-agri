import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import { useSelector } from "react-redux";
const DNPayment = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();
    //vnp_Amount=10000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14002644&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+cho+ma+GD%3Atest1&vnp_PayDate=20230501225020&vnp_ResponseCode=00&vnp_TmnCode=MDH56VK8&vnp_TransactionNo=14002644&vnp_TransactionStatus=00&vnp_TxnRef=test1&vnp_SecureHash=4caaaa0259af95747a72a555a7fc329b6daa45c335c937f6563b4950d9a534c281709f37d8e48302794128636ef7a7e7f6b056f56d576db042c1b1500c1cc85e
    const search = window.location.search;

    let date = new Date(
        JSON.parse(JSON.stringify(searchParams.get("vnp_PayDate"))).replace(
            /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
            "$4:$5:$6 $2/$3/$1"
        )
    ).toLocaleString("pt-PT");
    const message = () => {
        const code = searchParams.get("vnp_ResponseCode");
        switch (code) {
            case "00":
                return "Giao dịch thành công";

            case "09":
                return;
                "Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng";

            case "10":
                return;
                "Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";

            case "11":
                return;
                "Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";

            case "12":
                return "Thẻ/Tài khoản của khách hàng bị khóa.";

            case "13":
                return;
                "Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";

            case "24":
                return "Khách hàng hủy giao dịch";

            case "51":
                return;
                "Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";

            case "65":
                return;
                "Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";

            case "75":
                return "Ngân hàng thanh toán đang bảo trì.";

            case "79":
                return;
                "KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";

            default:
                return "Lỗi! Vui lòng thực hiện lại giao dịch";
        }
    };
    useEffect(() => {
        const updateData = async () => {
            await axios.get(`/dn/vnpay_ipn${search}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        };
        updateData();
    }, []);
    return (
        <div className="unit-manage pt-[85px] h-[730px] px-8 ">
            <div className="w-[40%] h-[90%] box-shadow-custom mx-auto p-5 rounded-xl">
                <div className="text-center font-bold text-2xl">
                    Kết quả thanh toán
                </div>
                <div className="mt-10 text-lg">
                    <div className="mb-8">
                        <span className="font-bold mr-5">Mã đơn hàng:</span>
                        <span>{searchParams.get("vnp_TxnRef")}</span>
                    </div>
                    <div className="mb-8">
                        <span className="font-bold mr-5">
                            Số tiền thanh toán:
                        </span>
                        <span>
                            {(searchParams.get("vnp_Amount") / 100)
                                .toString()
                                .replace(
                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1."
                                )}{" "}
                            VND
                        </span>
                    </div>
                    <div className="mb-8">
                        <span className="font-bold mr-5">
                            Thời gian thanh toán:
                        </span>
                        <span>{date}</span>
                    </div>
                    <div className="mb-8">
                        <span className="font-bold mr-5">
                            Hình thức thanh toán:
                        </span>
                        <span>{searchParams.get("vnp_CardType")}</span>
                    </div>
                    {searchParams.get("vnp_CardType") === "ATM" ? (
                        <div className="mb-8">
                            <span className="font-bold mr-5">
                                Mã ngân hàng:{" "}
                            </span>
                            <span>{searchParams.get("vnp_BankCode")}</span>
                        </div>
                    ) : null}
                    <div className="mb-8">
                        <span className="font-bold mr-5">
                            Trạng thái thanh toán:
                        </span>
                        <span
                            className={
                                searchParams.get("vnp_ResponseCode") === "00"
                                    ? "text-primary-color font-bold"
                                    : "text-secondary-color font-bold"
                            }
                        >
                            {searchParams.get("vnp_ResponseCode") === "00"
                                ? "Thành công"
                                : "Thất bại"}
                        </span>
                    </div>
                    <div className="mb-8">
                        <span className="font-bold mr-5">Lý do: </span>
                        <span>{message()}</span>
                    </div>

                    <div className="full text-center">
                        <Link
                            to="/quan_ly/don_hang"
                            className="mb-8 px-4 py-3 bg-primary-color text-white font-bold rounded-lg hover:bg-hover-priColor"
                        >
                            Đến trang quản lý đơn hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DNPayment;
