import React from "react";
import "./ProductDetail.css";
const ProductDesc = ({ viewIn = "" }) => {
    return (
        <div className="product-assess h-[85vh] box-shadow-custom mb-5 rounded-lg py-3 px-4 w-full overflow-y-scroll">
            <div className="title">
                <span className="text-xl font-bold">Đánh giá sản phẩm </span>
                <span>(100 lượt đánh giá)</span>
            </div>
            <div className="assess grid grid-cols-2 w-full my-5">
                <div className="assess-total flex flex-col w-full items-center justify-center gap-3">
                    <div className="assess-number">
                        <span className="text-primary-color font-bold text-4xl">
                            4.6 /
                        </span>
                        &nbsp;
                        <span className="text-red-700 font-bold text-3xl">
                            5
                        </span>
                    </div>
                    <div className="assess-star flex gap-2">
                        <img
                            src="/images/star.png"
                            alt="Số sao đánh giá"
                            className="h-6 w-6 inline"
                        />
                        <img
                            src="/images/star.png"
                            alt="Số sao đánh giá"
                            className="h-6 w-6 inline"
                        />
                        <img
                            src="/images/star.png"
                            alt="Số sao đánh giá"
                            className="h-6 w-6 inline"
                        />
                        <img
                            src="/images/star.png"
                            alt="Số sao đánh giá"
                            className="h-6 w-6 inline"
                        />
                        <img
                            src="/images/star.png"
                            alt="Số sao đánh giá"
                            className="h-6 w-6 inline"
                        />
                    </div>
                </div>
                <div className="assess-detail ">
                    <div className="flex items-center gap-3">
                        <div className="star flex gap-1">
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                        </div>
                        <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                            <div className="current-progress absolute top-0 left-0 h-full bg-primary-color w-1/2 rounded-md"></div>
                        </div>
                        <div className="number">255</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="star flex gap-1">
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                        </div>
                        <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                            <div className="current-progress absolute top-0 left-0 h-full bg-primary-color w-1/2 rounded-md"></div>
                        </div>
                        <div className="number">255</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="star flex gap-1">
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                        </div>
                        <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                            <div className="current-progress absolute top-0 left-0 h-full bg-primary-color w-1/2 rounded-md"></div>
                        </div>
                        <div className="number">255</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="star flex gap-1">
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                        </div>
                        <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                            <div className="current-progress absolute top-0 left-0 h-full bg-primary-color w-1/2 rounded-md"></div>
                        </div>
                        <div className="number">255</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="star flex gap-1">
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                            <img
                                src="/images/star.png"
                                alt="Số sao đánh giá"
                                className="h-3 w-3 inline"
                            />
                        </div>
                        <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                            <div className="current-progress absolute top-0 left-0 h-full bg-primary-color w-1/2 rounded-md"></div>
                        </div>
                        <div className="number">255</div>
                    </div>
                </div>
            </div>
            {viewIn === "unit" ? null : (
                <div className="assess-user">
                    <div className="assess-star flex items-center gap-4">
                        <p className="font-bold">Đánh giá: </p>
                        <div className="star-empty flex gap-3">
                            <img
                                src="/images/star-empty.png"
                                alt=""
                                className="w-6 h-6"
                            />
                            <img
                                src="/images/star-empty.png"
                                alt=""
                                className="w-6 h-6"
                            />
                            <img
                                src="/images/star-empty.png"
                                alt=""
                                className="w-6 h-6"
                            />
                            <img
                                src="/images/star-empty.png"
                                alt=""
                                className="w-6 h-6"
                            />
                            <img
                                src="/images/star-empty.png"
                                alt=""
                                className="w-6 h-6"
                            />
                        </div>
                    </div>
                    <div className="assess-comment flex items-center gap-3 my-3">
                        <p className="font-bold">Bình luận: </p>
                        <div className="input-comment flex-1 border-2 border-primary-color rounded-md px-2 py-1">
                            <textarea
                                name=""
                                id=""
                                rows="3"
                                className="outline-none w-full resize-none"
                                maxLength={130}
                            ></textarea>
                        </div>
                        <button className="outline-none border-2 border-primary-color hover:border-hover-priColor px-4 py-2 bg-primary-color hover:bg-hover-priColor text-white font-bold rounded-md ">
                            Gửi
                        </button>
                    </div>
                </div>
            )}
            <div className="list-assess ">
                <div className="assess-item my-2 grid grid-cols-12 gap-1 mt-5">
                    <div className="avatar col-span-2 overflow-hidden rounded-full w-12 h-12 border-2 border-primary-color text-center">
                        <img
                            src="/images/non-text-logo.png"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="content-assess col-span-10 -ml-5">
                        <div className="info flex justify-between items-center">
                            <div className="name">
                                <p className="font-bold ">Le Duy Tan</p>
                                <p className="date text-xs">
                                    22:03:33 15/02/2023
                                </p>
                            </div>
                            <div className="star flex gap-1">
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                            </div>
                        </div>
                        <div className="comment mt-2">
                            hàng bán hư 1 bên tai nghe, hàng tệ quá, mà không
                            nhận trách nhiệm trả hàng hoàn tiền, shop làm ăn
                            không trung thực, sau này mọi người ai tin tưởng
                            nữa.
                        </div>
                        {viewIn === "unit" ? (
                            <div className="assess-for bg-gray-100 flex gap-3 rounded-md p-2">
                                <div className="img h-12 w-12 rounded-md overflow-hidden border-2 border-primary-color">
                                    <img
                                        src="/images/non-text-logo.png"
                                        alt=""
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="name font-bold flex-1 text-sm">
                                    Khóm cầu đúc sản xuất tại hậu giang ăn rất
                                    ngon ngọt giòn tan
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="assess-item my-2 grid grid-cols-12 gap-1 mt-5">
                    <div className="avatar col-span-2 overflow-hidden rounded-full w-12 h-12 border-2 border-primary-color text-center">
                        <img
                            src="/images/non-text-logo.png"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="content-assess col-span-10 -ml-5">
                        <div className="info flex justify-between items-center">
                            <div className="name">
                                <p className="font-bold ">Le Duy Tan</p>
                                <p className="date text-xs">
                                    22:03:33 15/02/2023
                                </p>
                            </div>
                            <div className="star flex gap-1">
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                            </div>
                        </div>
                        <div className="comment mt-2">
                            hàng bán hư 1 bên tai nghe, hàng tệ quá, mà không
                            nhận trách nhiệm trả hàng hoàn tiền, shop làm ăn
                            không trung thực, sau này mọi người ai tin tưởng
                            nữa.
                        </div>
                    </div>
                </div>
                <div className="assess-item my-2 grid grid-cols-12 gap-1 mt-5">
                    <div className="avatar col-span-2 overflow-hidden rounded-full w-12 h-12 border-2 border-primary-color text-center">
                        <img
                            src="/images/non-text-logo.png"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="content-assess col-span-10 -ml-5">
                        <div className="info flex justify-between items-center">
                            <div className="name">
                                <p className="font-bold ">Le Duy Tan</p>
                                <p className="date text-xs">
                                    22:03:33 15/02/2023
                                </p>
                            </div>
                            <div className="star flex gap-1">
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                            </div>
                        </div>
                        <div className="comment mt-2">
                            hàng bán hư 1 bên tai nghe, hàng tệ quá, mà không
                            nhận trách nhiệm trả hàng hoàn tiền, shop làm ăn
                            không trung thực, sau này mọi người ai tin tưởng
                            nữa.
                        </div>
                    </div>
                </div>
                <div className="assess-item my-2 grid grid-cols-12 gap-1 mt-5">
                    <div className="avatar col-span-2 overflow-hidden rounded-full w-12 h-12 border-2 border-primary-color text-center">
                        <img
                            src="/images/non-text-logo.png"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="content-assess col-span-10 -ml-5">
                        <div className="info flex justify-between items-center">
                            <div className="name">
                                <p className="font-bold ">Le Duy Tan</p>
                                <p className="date text-xs">
                                    22:03:33 15/02/2023
                                </p>
                            </div>
                            <div className="star flex gap-1">
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                                <img
                                    src="/images/star.png"
                                    alt=""
                                    className="w-2 h-2"
                                />
                            </div>
                        </div>
                        <div className="comment mt-2">
                            hàng bán hư 1 bên tai nghe, hàng tệ quá, mà không
                            nhận trách nhiệm trả hàng hoàn tiền, shop làm ăn
                            không trung thực, sau này mọi người ai tin tưởng
                            nữa.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDesc;
