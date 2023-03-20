import React from "react";
import { Link } from "react-router-dom";
import ProductDescSlider from "../../ProductDetail/ProductDescSlider";

const VerifyDetail = () => {
    const imageData = [
        {
            id: 1,
            url: "https://thanhlapdoanhnghiepvn.vn/Uploads/images/dang-ky-giay-phep-kinh-doanh-doanh-nghiep(1).jpg",
        },
        {
            id: 2,
            url: "https://viettinlaw.com/wp-content/uploads/2013/07/gcndkkd.jpg",
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        },
    ];
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
                            src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="info-basic col-span-5 px-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">
                                Mã đơn vị:
                            </span>
                            <span className="col-span-9">DV_000001</span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">
                                Tên đơn vị:
                            </span>
                            <span className="col-span-9">
                                Hợp tác xã Kỳ Như
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Loại đơn vị:
                            </span>
                            <span className="col-span-9">Hợp tác xã</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Lĩnh vực:
                            </span>
                            <span className="col-span-9">
                                Nuôi trông và chế biến cá thát lát
                            </span>
                        </p>
                        <p className="info-id text-lg my-2">
                            <span className="font-bold col-span-3">Email:</span>
                            <span className="col-span-9">
                                kynhucta@khth.com
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Số điện thoại:
                            </span>
                            <span className="col-span-9">09393837367</span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Địa chỉ:
                            </span>
                            <span className="col-span-9">
                                Số 123, ấp Nhất, xã Thạnh Hòa, huyện Phụng Hiệp,
                                tỉnh Hậu Giang
                            </span>
                        </p>
                        <p className="info-type text-lg my-2">
                            <span className="font-bold col-span-3">
                                Ngày đăng ký:
                            </span>
                            <span className="col-span-9">
                                10/03/2023, 20:17:03
                            </span>
                        </p>
                    </div>
                </div>
                <div className="info-desc-verify flex gap-[50px] px-10 pt-5 items-start">
                    <div className="info-desc my-2">
                        <p className="text-lg font-bold">Mô tả:</p>
                        <div className="mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reiciendis, rerum, officia illum possimus
                            obcaecati alias minima eaque facilis voluptas totam
                            molestiae, autem odio inventore quisquam adipisci
                            error ratione quos voluptatum!
                        </div>
                    </div>
                    <div className="info-verify my-2">
                        <p className="text-lg font-bold">Ảnh minh chứng:</p>
                        <ProductDescSlider
                            imageData={imageData}
                            customClass="w-[610px] h-[900px] mt-2"
                        ></ProductDescSlider>
                    </div>
                </div>
                <div className="info-desc-verify px-10 mt-[40px] items-start w-full">
                    <div className="mx-auto flex justify-center gap-[50px]">
                        <div className="p-2 min-w-[165px] bg-secondary-color rounded-lg font-bold text-white text-lg text-center cursor-pointer hover:bg-hover-secColor">
                            Yêu cầu thông tin
                        </div>
                        <div className="p-2 min-w-[165px] bg-primary-color rounded-lg font-bold text-white text-lg text-center cursor-pointer hover:bg-hover-priColor">
                            Xác thực đơn vị
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyDetail;
