import React, { useState } from "react";
import "./ProductDetail.css";
import { useSelector } from "react-redux";
const ProductAssess = ({ viewIn = "" }) => {
    const { user } = useSelector((state) => state.auth);
    const { assess } = useSelector((state) => state.common);
    const star = Array(5).fill(0);
    const numStar = assess?.tb || 0;
    const [starAssess, setStarAssess] = useState(-1);
    const loopAssess = viewIn ? assess && assess.dvdg : assess && assess.list;

    return (
        <div className="product-assess h-[85vh] box-shadow-custom mb-5 rounded-lg py-3 px-4 w-full overflow-y-scroll">
            <div className="title">
                <span className="text-xl font-bold">Đánh giá sản phẩm </span>
                <span>({assess ? assess.list.length : 0} lượt đánh giá)</span>
            </div>
            {assess && assess.list.length > 0 ? (
                <div className="assess grid grid-cols-2 w-full my-5">
                    <div className="assess-total flex flex-col w-full items-center justify-center gap-3">
                        <div className="assess-number">
                            <span className="text-primary-color font-bold text-4xl">
                                {assess.tb} /
                            </span>
                            &nbsp;
                            <span className="text-red-700 font-bold text-3xl">
                                5
                            </span>
                        </div>
                        <div className="assess-star flex gap-2">
                            {star.map((item, index) => {
                                if (index <= numStar - 1) {
                                    return (
                                        <i
                                            className={`fa-solid fa-star ${
                                                viewIn ? "text-xl" : "text-3xl"
                                            } text-yellow-400`}
                                            key={index}
                                        ></i>
                                    );
                                } else if (
                                    index > numStar &&
                                    numStar <= index + 1
                                )
                                    return (
                                        <i
                                            className={`fa-regular fa-star ${
                                                viewIn ? "text-xl" : "text-3xl"
                                            } text-yellow-400`}
                                            key={index}
                                        ></i>
                                    );
                                else {
                                    return (
                                        <i
                                            className={`fa-solid fa-star-half-stroke ${
                                                viewIn ? "text-xl" : "text-3xl"
                                            } text-yellow-400`}
                                            key={index}
                                        ></i>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="assess-detail ">
                        {star.map((item, index) => (
                            <div
                                className="flex items-center gap-3"
                                key={index}
                            >
                                <div className="star flex gap-1 mb-1">
                                    {star.map((value, i) => {
                                        if (index !== 0 && index + i >= 5)
                                            return (
                                                <i
                                                    className="fa-regular fa-star text-sm text-yellow-400"
                                                    key={i}
                                                ></i>
                                            );
                                        else {
                                            return (
                                                <i
                                                    className="fa-solid fa-star text-sm text-yellow-400"
                                                    key={i}
                                                ></i>
                                            );
                                        }
                                    })}
                                </div>
                                <div className="progress relative h-[15px] flex-1 bg-gray-300 rounded-md">
                                    <div
                                        className={`current-progress absolute top-0 left-0 h-full bg-primary-color ${
                                            viewIn
                                                ? `w-[${
                                                      (assess.sao &&
                                                          assess.sao[
                                                              4 - index
                                                          ] /
                                                              assess.list
                                                                  .length) * 100
                                                  }%]`
                                                : `w-[${
                                                      (assess[
                                                          `sao${5 - index}`
                                                      ] /
                                                          assess.list.length) *
                                                      100
                                                  }%]`
                                        } rounded-md`}
                                    ></div>
                                </div>
                                <div className="number">
                                    {viewIn
                                        ? assess.sao
                                            ? assess.sao[4 - index]
                                            : 1
                                        : assess[`sao${5 - index}`]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            {viewIn === "unit" || !user ? null : (
                <div className="assess-user">
                    <div className="assess-star flex items-center gap-4">
                        <p className="font-bold">Đánh giá: </p>
                        <div className="star-empty flex gap-3">
                            {star.map((item, index) => {
                                if (index < starAssess)
                                    return (
                                        <i
                                            className="fa-solid fa-star text-2xl text-yellow-400 cursor-pointer"
                                            onClick={() =>
                                                setStarAssess(index + 1)
                                            }
                                            key={index}
                                        ></i>
                                    );
                                else {
                                    return (
                                        <i
                                            className="fa-regular fa-star text-2xl text-yellow-400 cursor-pointer"
                                            onClick={() =>
                                                setStarAssess(index + 1)
                                            }
                                            key={index}
                                        ></i>
                                    );
                                }
                            })}
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
            {assess && assess.list.length > 0 ? (
                <div className="list-assess ">
                    {loopAssess &&
                        loopAssess.map((item, index) => (
                            <div
                                className={`assess-item my-2 grid grid-cols-12 ${
                                    viewIn ? "gap-9" : "gap-4"
                                } mt-5`}
                                key={index}
                            >
                                <div className="avatar col-span-2 overflow-hidden rounded-full w-12 h-12 border-2 border-primary-color text-center">
                                    <img
                                        src={
                                            item.DV_Logo ||
                                            "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                                        }
                                        alt=""
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="content-assess col-span-10 -ml-5">
                                    <div className="info flex justify-between items-center">
                                        <div className="name">
                                            <p className="font-bold ">
                                                {item.DV_TenDonVi}
                                            </p>
                                            <p className="date text-xs">
                                                {item.DG_ThoiGian ||
                                                    (assess?.list &&
                                                        assess.list[index]
                                                            .DG_ThoiGian)}
                                            </p>
                                        </div>
                                        <div className="star flex gap-1">
                                            {star.map((starItem, starIndex) => {
                                                if (
                                                    starIndex <=
                                                    ((viewIn &&
                                                        assess.list &&
                                                        assess.list[index]
                                                            .DG_Sao) ||
                                                        item.DG_Sao) -
                                                        1
                                                ) {
                                                    return (
                                                        <i
                                                            className="fa-solid fa-star text-sm text-yellow-400"
                                                            key={starIndex}
                                                        ></i>
                                                    );
                                                } else {
                                                    return (
                                                        <i
                                                            className="fa-regular fa-star text-sm text-yellow-400"
                                                            key={starIndex}
                                                        ></i>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className="comment mt-2">
                                        {item.DG_BinhLuan ||
                                            (assess &&
                                                assess.list[index]
                                                    ?.DG_BinhLuan)}
                                    </div>
                                    {viewIn === "unit" ? (
                                        <div className="assess-for bg-gray-100 flex gap-3 rounded-md p-2">
                                            <div className="img h-10 w-10 rounded-md overflow-hidden border-2 border-primary-color">
                                                <img
                                                    src={
                                                        assess.list[index]
                                                            .SP_AnhDaiDien
                                                    }
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div className="name font-bold flex-1 text-sm my-auto">
                                                {
                                                    assess.list[index]
                                                        .SP_TenSanPham
                                                }
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                </div>
            ) : null}
        </div>
    );
};

export default ProductAssess;
