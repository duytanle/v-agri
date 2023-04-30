import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateCurrentAccount } from "../../../store/account/account-slice";
const AccountDetail = () => {
    const { accounts, currentAccount } = useSelector((state) => state.account);
    const id = useParams().id;
    const dispatch = useDispatch();

    useEffect(() => {
        const currentAccount = accounts?.find(
            (account) => account.ND_MaND === id
        );
        dispatch(updateCurrentAccount(currentAccount));
    }, [accounts]);

    return (
        <div className="product-info relative z-0 h-[600px] animate__animated animate__fadeIn ">
            <div className="info-background h-3/4 pt-2">
                <div className="bg-img h-full">
                    <img
                        src="/images/infoBG.jpg"
                        alt=""
                        className="h-full w-full object-cover rounded-[35px]"
                    />
                </div>
                <div className="info-bg-title absolute top-7 left-1/2 -translate-x-1/2 font-bold text-4xl text-white tracking-wider">
                    THÔNG TIN CHI TIẾT
                </div>
                <Link
                    to="/tai_khoan"
                    className="bg-back-home absolute top-7 left-4 flex items-center cursor-pointer"
                >
                    <img
                        src="/images/back-arrow.png"
                        alt=""
                        className="w-7 h-7 mr-3"
                    />

                    <span className="text-white text-lg font-bold ">
                        Trở lại
                    </span>
                </Link>
            </div>
            <div className="info-card h-4/5 absolute top-[15%] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl">
                <div className="flex justify-evenly [&>*]:my-auto h-full px-10 ">
                    <div className="info-img col-span-3   relative p-4 w-[300px] h-[300px] ">
                        <img
                            src={
                                currentAccount?.ND_AnhDaiDien ||
                                "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                            }
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-basic col-span-5 px-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">
                                Mã người dùng:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_MaND}
                            </span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">
                                Họ tên:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_HoTen ||
                                    "Người dùng chưa cập nhật"}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Loại người dùng:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.LND_TenLoai}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Tài khoản:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_TaiKhoan}
                            </span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">Email:</span>
                            <span className="col-span-7">
                                {currentAccount?.ND_Email ||
                                    "Người dùng chưa cập nhật"}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Số điện thoại:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_DienThoai ||
                                    "Người dùng chưa cập nhật"}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Cảnh báo:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_CanhBao
                                    ? currentAccount?.ND_CanhBao.split(" ")[0]
                                    : 0}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Ngày đăng ký:
                            </span>
                            <span className="col-span-7">
                                {currentAccount?.ND_NgayDangKy}
                            </span>
                        </p>
                        <div className="w-full text-center mt-6 ">
                            <span className="col-span-12 max-w-[200px] p-2 bg-secondary-color text-white font-bold text-lg  rounded-lg cursor-pointer hover:bg-hover-secColor">
                                Xóa tài khoản
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetail;
