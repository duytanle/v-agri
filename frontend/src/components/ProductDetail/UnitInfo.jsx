import React from "react";
import { useSelector } from "react-redux";
const UnitInfo = () => {
    const { detailUnit } = useSelector((state) => state.product);
    return (
        <div className="unit-info max-h-[48%] rounded-lg box-shadow-custom py-3 px-4 w-full">
            <div className="title text-xl font-bold ">Thông tin đơn vị</div>
            <div className="unit-basic my-5 flex gap-6">
                <div className="unit-basic-logo border-2 border-primary-color rounded-full h-20 w-20 overflow-hidden">
                    <img
                        src={detailUnit?.DV_Logo}
                        alt=""
                        className="inline-block w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <p className="unit-name text-lg font-bold">
                        {detailUnit?.DV_TenDonVi}
                    </p>
                    <p>
                        {detailUnit?.DCCT_TenDiaChi},&nbsp;
                        {detailUnit?.XP_TenXaPhuong},&nbsp;
                        {detailUnit?.QH_TenQuanHuyen},&nbsp;
                        {detailUnit?.TT_TenTinhThanh},&nbsp;
                    </p>
                </div>
            </div>
            <div className="unit-field flex gap-5 my-2">
                <span className="font-bold">Lĩnh vực: </span>
                <span>{detailUnit?.DV_LinhVuc}</span>
            </div>
            <div className="unit-contact flex gap-5 my-2">
                <p className="font-bold">Liên hệ: </p>
                <div className="phone">
                    <img
                        src="/images/phone.png"
                        alt=""
                        className="w-5 h-5 inline-block mr-4"
                    />
                    <span>{detailUnit?.DV_DienThoai}</span>
                </div>
                <div className="email">
                    <img
                        src="/images/mail.png"
                        alt=""
                        className="w-5 h-5 inline-block mr-4"
                    />
                    <span>{detailUnit?.DV_Email}</span>
                </div>
            </div>
            <div className="unit-short-info flex justify-between items-center my-5">
                <div className="amount-product">
                    <p className="text-center font-bold">30</p>
                    <p>Sản phẩm</p>
                </div>
                <div className="assess-star flex flex-col items-center">
                    <div className="flex items-center gap-2 ">
                        <p className="font-bold">4.5</p>
                        <img
                            src="/images/star.png"
                            alt=""
                            className="inline-block w-5 h-5"
                        />
                    </div>
                    <p>Đánh giá</p>
                </div>
                <div className="par-time">
                    <p className="text-center font-bold">5 năm</p>
                    <p>Đã tham gia</p>
                </div>
                <div className="view-unit flex gap-4">
                    <button className="outline-none px-2 py-1 border-2 border-primary-color rounded-lg bg-primary-color text-white font-bold hover:bg-hover-priColor hover:border-hover-priColor">
                        Xem đơn vị
                    </button>
                    <button className="outline-none px-2 py-1 border-2 border-primary-color rounded-lg bg-primary-color text-white font-bold hover:bg-hover-priColor hover:border-hover-priColor min-w-[100px]">
                        Nhắn tin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnitInfo;
