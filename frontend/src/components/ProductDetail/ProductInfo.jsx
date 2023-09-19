import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormOrder from "./ProductFormOrder";
import Modal from "../../components/Portal/Modal.jsx";
import Product from "../HomeProduct/Products/Product";
import queryString from "query-string";
const ProductInfo = () => {
    const { user, userUnit, accessToken } = useSelector((state) => state.auth);
    const { products, productDetail } = useSelector((state) => state.product);
    const { assess } = useSelector((state) => state.common);
    const numStar = assess?.tb || 0;
    const star = Array(5).fill(0);
    const [modal, showModal] = useState(false);
    const [listIntro, setListIntro] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arraySP_Chuan = productDetail?.SP_Chuan?.split(", ") || [];

    const handleChoose = (event) => {
        if (event.target.checked) {
            setListIntro([...listIntro, event.target.id]);
        } else {
            const newList = JSON.parse(JSON.stringify(listIntro));
            const indexIntro = newList.indexOf(event.target.id);
            newList.splice(indexIntro, 1);
            setListIntro(newList);
        }
    };

    const checkKM = () => {
        if (!productDetail?.KM_MaKM) {
            return false;
        } else {
            const startDate = productDetail?.KM_NgayBatDau?.split("/") || "";
            const newStartDate = new Date(
                startDate[1] + "/" + startDate[0] + "/" + startDate[2]
            );
            const endDate = productDetail?.KM_NgayKetThuc?.split("/") || "";
            const newEndDate = new Date(
                endDate[1] + "/" + endDate[0] + "/" + endDate[2]
            );
            return newStartDate <= new Date() && new Date() <= newEndDate;
        }
    };

    const handleIntroProduct = () => {
        dispatch({
            type: "HTX_INTRO_PRODUCT",
            payload: {
                token: accessToken,
                data: {
                    SP_MaSP: productDetail.SP_MaSP,
                    DV_MaDV: productDetail.DV_MaDV,
                    HTX_MaQL: userUnit.HTX_MaQL,
                    SPGT_DanhSach: listIntro,
                    ND_MaND: user.ND_MaND,
                },
            },
        });
        setListIntro([]);
        showModal(false);
    };
    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: queryString.stringify({
                search: "",
                unitID: userUnit.DV_MaDV,
                type: user ? (user.LND_MaLND === "HTX" ? "DN" : "HTX") : "all",
                productNew: "",
                productTop: false,
                productStandard: "all",
                productPrice: "",
                category: "",
            }),
        });
    }, []);
    return (
        <div className="product-info relative z-0 h-full">
            <div className="info-background h-2/3">
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
                <div
                    className="bg-back-home absolute top-7 left-4 flex items-center cursor-pointer"
                    onClick={() => window.history.back()}
                >
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
            {productDetail?.LSP_MaLSP === "HTX" ? (
                <div className="info-card h-3/4 absolute top-[20%] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl grid grid-cols-11">
                    <div className="info-basic col-span-4 h-[80%] my-auto px-8 flex flex-col justify-start items-start">
                        <p className="info-name font-bold text-3xl mb-6 text-center leading-10  w-full">
                            {productDetail?.SP_TenSanPham}
                        </p>
                        <p className="info-price font-bold text-3xl mb-6 self-center text-red-700">
                            {(checkKM()
                                ? (productDetail?.GSP_Gia *
                                      (100 - productDetail?.KM_PhanTram)) /
                                  100
                                : productDetail?.GSP_Gia
                            )
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                            &nbsp;vnđ&nbsp;/&nbsp;1&nbsp;
                            {productDetail?.GSP_DonViTinh}
                        </p>
                        <p className="info-amount text-lg my-4">
                            <span className="font-bold">Đơn vị: </span>
                            <span>{productDetail?.DV_TenDonVi}</span>
                        </p>
                        <p className="info-ability text-lg my-4">
                            <span className="font-bold">
                                Khả năng cung cấp:{" "}
                            </span>
                            <span>
                                {productDetail?.SP_SoLuongCungCau}&nbsp;/&nbsp;
                                {productDetail?.SP_ChuKyCungCau}
                            </span>
                        </p>
                        <p className="info-star text-lg my-4">
                            <span className="font-bold">Đánh giá: </span>
                            {numStar === 0 ? (
                                <span>Chưa có đánh giá</span>
                            ) : (
                                star.map((item, index) => {
                                    if (index <= numStar - 1) {
                                        return (
                                            <i
                                                className="fa-solid fa-star text-xl text-yellow-400"
                                                key={index}
                                            ></i>
                                        );
                                    } else if (
                                        index > numStar &&
                                        numStar <= index + 1
                                    )
                                        return (
                                            <i
                                                className="fa-regular fa-star text-xl text-yellow-400"
                                                key={index}
                                            ></i>
                                        );
                                    else {
                                        return (
                                            <i
                                                className="fa-solid fa-star-half-stroke text-xl text-yellow-400"
                                                key={index}
                                            ></i>
                                        );
                                    }
                                })
                            )}
                        </p>
                        <div className="info-standard flex-1 mt-2 text-lg my-2 w-full flex justify-around">
                            {arraySP_Chuan.length > 0
                                ? arraySP_Chuan.map((chuan) => (
                                      <img
                                          src={`/images/standard-${chuan}.png`}
                                          alt=""
                                          className="w-[130px] "
                                          key={chuan}
                                      />
                                  ))
                                : null}
                        </div>
                    </div>
                    <div className="info-img col-span-3 h-[70%] my-auto relative p-4 w-full ">
                        <img
                            src={productDetail?.SP_AnhDaiDien}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-order col-span-4 px-4 h-[80%] my-auto">
                        <div className="info-order-title text-center font-bold text-3xl mb-10">
                            Thông Tin Đơn Hàng
                        </div>
                        {user?.LND_MaLND === "DN" ? (
                            <ProductFormOrder></ProductFormOrder>
                        ) : (
                            <div className="text-xl  text-center text-secondary-color font-bold">
                                Đăng nhập để đặt hàng
                            </div>
                        )}
                    </div>
                    {checkKM() ? (
                        <div className="absolute top-3 -left-4 rounded-md bg-red-700 text-white font-bold text-lg px-2 py-1">
                            <span>Giảm {productDetail?.KM_PhanTram}%</span>
                            <div className="absolute top-[32px] left-0 border-[8px] border-t-red-700  border-l-transparent border-r-red-700 border-b-transparent"></div>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="info-card h-3/4 absolute top-[20%] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl grid grid-cols-11">
                    <div className="info-basic col-span-4 h-[80%] my-auto px-4 flex flex-col justify-start items-start">
                        <p className="info-name font-bold text-3xl mb-5 text-center leading-10  w-full">
                            {productDetail?.SP_TenSanPham}
                        </p>
                        <p className="info-price font-bold text-3xl mb-5 self-center text-red-700">
                            Nhu cầu: {productDetail?.SP_SoLuongCungCau}
                            &nbsp;/&nbsp;
                            {productDetail?.SP_ChuKyCungCau}
                        </p>
                        <p className="info-amount text-lg my-2">
                            <span className="font-bold">Đơn vị: </span>
                            <span>{productDetail?.DV_TenDonVi}</span>
                        </p>
                        <p className="info-amount text-lg my-2">
                            <span className="font-bold">Lĩnh vực: </span>
                            <span>{productDetail?.DV_LinhVuc}</span>
                        </p>
                        <p className="info-amount text-lg my-2">
                            <span className="font-bold">Email: </span>
                            <span>{productDetail?.DV_Email}</span>
                        </p>
                        <p className="info-amount text-lg my-2">
                            <span className="font-bold">Điện thoại: </span>
                            <span>{productDetail?.DV_DienThoai}</span>
                        </p>
                        <p className="info-amount text-lg my-2">
                            <span className="font-bold">Địa chỉ: </span>
                            <span>
                                {productDetail?.DCCT_TenDiaChi},&nbsp;
                                {productDetail?.XP_TenXaPhuong},&nbsp;
                                {productDetail?.QH_TenQuanHuyen},&nbsp;
                                {productDetail?.TT_TenTinhThanh}
                            </span>
                        </p>
                        <div className="w-full text-center mt-3 flex gap-5">
                            <div className=" min-w-[130px] mx-auto bg-primary-color rounded-lg py-2 px-5 text-white font-bold text-lg cursor-pointer hover:bg-hover-priColor">
                                Trao đổi
                            </div>
                            <div
                                className=" w-max mx-auto bg-primary-color rounded-lg py-2 px-5 text-white font-bold text-lg cursor-pointer hover:bg-hover-priColor"
                                onClick={() =>
                                    navigate(
                                        `/don_vi/${productDetail?.DV_MaDV}`
                                    )
                                }
                            >
                                Xem đơn vị
                            </div>
                        </div>
                    </div>
                    <div className="info-img col-span-3 h-[70%] my-auto relative p-4 w-full ">
                        <img
                            src={productDetail?.SP_AnhDaiDien}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-order col-span-4 px-8 h-[80%] my-auto flex flex-col justify-between">
                        <div className="info-amount text-lg my-2">
                            <p className="font-bold">
                                Mô tả thông tin yêu cầu:
                            </p>
                            <p className="h-[80%] text-justify">
                                {productDetail?.SP_MoTa}
                            </p>
                        </div>
                        <div className="mt-[80px] w-full text-center ">
                            {user ? (
                                <div
                                    className="bg-primary-color text-white font-bold text-lg rounded-lg py-2 px-4 w-max mx-auto cursor-pointer hover:bg-hover-priColor"
                                    onClick={() => showModal(true)}
                                >
                                    Chào hàng
                                </div>
                            ) : (
                                <div className="text-lg font-bold text-secondary-color">
                                    Vui lòng đăng nhập để chào hàng
                                </div>
                            )}
                        </div>
                    </div>
                    <Modal
                        visible={modal}
                        onClose={() => showModal(false)}
                        bodyClassName="w-[800px] h-[500px] bg-white rounded-xl px-4 py-3 relative"
                    >
                        <div
                            className="absolute top-1 right-1 p-1 w-10 h-10 text-white text-xl font-bold rounded-full bg-secondary-color flex justify-center items-center cursor-pointer hover:bg-hover-secColor"
                            onClick={() => showModal(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="title text-2xl text-center font-bold">
                            Chọn sản phẩm tương ứng để chào hàng
                        </div>
                        <div className="flex gap-x-8 gap-y-1 mt-10 h-[75%] w-[85%] mx-auto overflow-x-scroll p-3">
                            {products.map((item, index) => (
                                <div
                                    className="flex flex-col gap-3 items-center justify-center"
                                    key={index}
                                >
                                    <Product
                                        data={item}
                                        customProduct="h-[275px] min-w-[220px] max-w-[220px]"
                                        customTSP="leading-4 h-[35px] text-base"
                                        onView={() => {}}
                                    ></Product>
                                    <input
                                        type="checkbox"
                                        name={item.SP_MaSP}
                                        id={item.SP_MaSP}
                                        className="cursor-pointer w-5 h-5 accent-primary-color"
                                        onChange={handleChoose}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-full mt-2">
                            <div
                                className="w-max mx-auto bg-primary-color rounded-lg text-white px-3 py-2 font-bold cursor-pointer hover:bg-hover-priColor"
                                onClick={handleIntroProduct}
                            >
                                Chào hàng
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
