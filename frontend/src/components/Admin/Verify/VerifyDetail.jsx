import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDescSlider from "../../ProductDetail/ProductDescSlider";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUnit } from "../../../store/account/account-slice";

const VerifyDetail = () => {
    const { units, currentUnit } = useSelector((state) => state.account);
    const id = useParams().id;
    const dispatch = useDispatch();
    const imageData = currentUnit?.DV_MinhChung?.split(", ").map(
        (link, index) => ({ id: index, url: link })
    ) || [
        {
            id: 0,
            url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png",
        },
    ];

    const handleVerifyUnit = () => {};
    useEffect(() => {
        const currentUnit = units?.find((unit) => unit.DV_MaDV === id);
        dispatch(updateCurrentUnit(currentUnit));
    }, [units]);

    return (
        <div className="product-info relative z-0 h-full animate__animated animate__fadeIn ">
            <div className="info-background h-[1570px] pt-2">
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
                    to="/xac_minh"
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
            <div className="info-card absolute top-[5%] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl py-5">
                <div className="flex gap-[50px] [&>*]:my-auto h-full px-10 ">
                    <div className="info-img col-span-3 relative p-4 w-[300px] h-[300px] flex-shrink-0">
                        <img
                            src={
                                currentUnit?.DV_Logo ||
                                "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                            }
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-basic col-span-5 px-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">
                                Mã đơn vị:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.DV_MaDV}
                            </span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">
                                Tên đơn vị:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.DV_TenDonVi}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Loại đơn vị:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.LDV_TenLoai}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Lĩnh vực:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.DV_LinhVuc}
                            </span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">Email:</span>
                            <span className="col-span-9">
                                {currentUnit?.DV_Email}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Số điện thoại:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.DV_DienThoai}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Địa chỉ:
                            </span>
                            <span className="col-span-9">
                                {`${currentUnit?.DCCT_TenDiaChi}, ${currentUnit?.XP_TenXaPhuong}, ${currentUnit?.QH_TenQuanHuyen}, ${currentUnit?.TT_TenTinhThanh}`}
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Xác minh:
                            </span>
                            <span className="col-span-9">
                                {currentUnit?.DV_XacMinh
                                    ? "Đã xác minh"
                                    : "Chưa xác minh"}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="info-desc-verify grid grid-cols-11 gap-5 px-10 pt-5 items-start">
                    <div className="info-desc my-2 col-span-4">
                        <p className="text-lg font-bold">Mô tả:</p>
                        <div className="mt-2 text-justify">
                            {currentUnit?.DV_MoTa}
                        </div>
                    </div>
                    <div className="info-verify my-2 col-span-7">
                        <p className="text-lg font-bold">Ảnh minh chứng:</p>
                        <ProductDescSlider
                            imageData={imageData}
                            customClass="w-[610px] h-[900px] mt-2"
                        ></ProductDescSlider>
                    </div>
                </div>
                <div className="info-desc-verify px-10 mt-[40px] items-start w-full">
                    <div className="mx-auto flex justify-center gap-[50px]">
                        <button className="p-2 min-w-[165px] bg-secondary-color rounded-lg font-bold text-white text-lg text-center cursor-pointer hover:bg-hover-secColor">
                            Yêu cầu thông tin
                        </button>
                        <button
                            className={`p-2 min-w-[165px] bg-primary-color rounded-lg font-bold text-white text-lg text-center  ${
                                currentUnit?.DV_XacMinh
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer hover:bg-hover-priColor"
                            }`}
                            disabled={currentUnit?.DV_XacMinh}
                            onClick={handleVerifyUnit}
                        >
                            Xác minh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyDetail;
