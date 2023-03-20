import React from "react";
import { Link } from "react-router-dom";

const AccountDetail = () => {
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
                            src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-basic col-span-5 px-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">
                                Mã người dùng:
                            </span>
                            <span className="col-span-7">ND_000001</span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">
                                Họ tên:
                            </span>
                            <span className="col-span-7">Lê Duy Tân</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Loại người dùng:
                            </span>
                            <span className="col-span-7">Quản lý HTX</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Tài khoản:
                            </span>
                            <span className="col-span-7">kynhucta</span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-5">Email:</span>
                            <span className="col-span-7">
                                kynhucta@khth.com
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Số điện thoại:
                            </span>
                            <span className="col-span-7">09393837367</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Cảnh báo:
                            </span>
                            <span className="col-span-7">2</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-5">
                                Ngày đăng ký:
                            </span>
                            <span className="col-span-7">
                                10/03/2023, 20:17:03
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
