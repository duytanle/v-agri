import React from "react";

const UnitInfo = () => {
    return (
        <div className="unit-info  relative z-0 ">
            <div className="info-background h-[450px]">
                <div className="bg-img h-full">
                    <img
                        src="/images/infoBG.jpg"
                        alt=""
                        className="h-full w-full object-cover rounded-[35px]"
                    />
                </div>
                <div className="info-bg-title absolute top-12 left-1/2 -translate-x-1/2 font-bold text-4xl text-white tracking-wider">
                    THÔNG TIN ĐƠN VỊ
                </div>
                <div className="bg-back-home absolute top-12 left-4 flex items-center cursor-pointer">
                    <img
                        src="/images/back-arrow.png"
                        alt=""
                        className="w-7 h-7 mr-3"
                    />
                    <span className="text-white text-lg font-bold ">
                        Trở lại
                    </span>
                </div>
            </div>
            <div className="info-card h-[500px] absolute top-[125px] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl grid grid-cols-11">
                <div className="info-name font-bold col-span-12 text-4xl my-8 ml-8 text-red-700 ">
                    HTX Nước mắm Tĩnh Gia Thanh Hóa
                </div>
                <div className="info-basic col-span-4 h-full my-auto pr-5 pl-8 flex flex-col justify-start items-start ">
                    <div className="info-amount text-lg my-2">
                        <span className="font-bold">Lĩnh vực hoạt động: </span>
                        <span>Sản xuất nước mắm từ cá cơm</span>
                    </div>

                    <div className="info-star text-lg my-2 flex gap-2 items-center">
                        <span className="font-bold">Đánh giá chất lượng: </span>
                        <span className="flex gap-2">
                            <img
                                src="/images/star.png"
                                alt=""
                                className="h-5 w-5 inline-block"
                            />
                            <img
                                src="/images/star.png"
                                alt=""
                                className="h-5 w-5 inline-block"
                            />
                            <img
                                src="/images/star.png"
                                alt=""
                                className="h-5 w-5 inline-block"
                            />
                            <img
                                src="/images/star.png"
                                alt=""
                                className="h-5 w-5 inline-block"
                            />
                        </span>
                    </div>
                    <div className="unit-contact my-2 text-lg">
                        <p className="font-bold">Liên hệ: </p>
                        <div className="ml-[70px]">
                            <div className="phone flex items-center">
                                <img
                                    src="/images/phone.png"
                                    alt=""
                                    className="w-5 h-5 inline-block mr-3"
                                />
                                <span>0939393837</span>
                            </div>
                            <div className="email  flex items-center">
                                <img
                                    src="/images/mail.png"
                                    alt=""
                                    className="w-5 h-5 inline-block mr-3"
                                />
                                <span>tinhgiathanhhoa@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="info-address text-lg my-2">
                        <span className="font-bold">Địa chỉ: </span>
                        <span>
                            128, quốc lộ 61C, ấp Long Hội, xã Long Bình, huyện
                            Vị Xuyên, tỉnh Hà Giang
                        </span>
                    </div>
                    <div className="flex justify-evenly items-center my-5 w-full text-lg">
                        <div className="amount-product ">
                            <p className="text-center font-bold text-red-700">
                                30
                            </p>
                            <p>Sản phẩm</p>
                        </div>

                        <div className="par-time">
                            <p className="text-center font-bold text-red-700">
                                5 năm
                            </p>
                            <p>Đã tham gia</p>
                        </div>
                    </div>
                </div>
                <div className="info-img col-span-3 h-[80%]  relative p-4 w-full ">
                    <img
                        src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <div className="info-basic col-span-4 h-full my-auto px-8 flex flex-col justify-start items-start ">
                    <div className="info-desc text-lg indent-8 text-justify">
                        HTX nước mắm tĩnh gia thanh hóa tham gia hoạt động sản
                        xuất nước mắm và các sản phậm phụ trợ từ cá, cung cấp
                        cho thị trường. Sản phẩm chủ lực của chúng tôi là nước
                        mắm cá cơm với năng suất 1000 lít / tháng với chất lượng
                        cáo. Các sản phẩm mà đơn vị cung cấp đều đạt các chuẩn
                        kiểm định chất lượng và vệ sinh an toàn thực phẩm.
                    </div>
                    <div className="info-chat w-full text-center my-5">
                        <button className="outline-none p-3 border-2 rounded-lg bg-primary-color text-lg text-white font-bold hover:bg-hover-priColor">
                            Nhắn tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitInfo;
