import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductStandard from "../HomeProduct/Products/ProductStandard";
import { updateCurrentVerify } from "../../store/post/post-slice";
import ProductDescSlider from "../ProductDetail/ProductDescSlider.jsx";
import { useForm } from "react-hook-form";
import Checkbox from "../CustomForm/Checkbox.jsx";
import { toast } from "react-toastify";
const AdPostVerify = () => {
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { productVerify, currentVerify } = useSelector((state) => state.post);
    const { accessToken } = useSelector((state) => state.auth);
    const totalPage = productVerify ? Math.ceil(productVerify.length / 10) : 1;
    const [imageData, setImageData] = useState([]);
    const standardColor = {
        OCOP: "[#FF78F0]",
        VietGAP: "[#2DCDDF]",
        GlobalGAP: "orange-500",
    };
    const handleShow = (data) => {
        if (!show) {
            setShow(!show);
            dispatch(updateCurrentVerify(data));
        } else {
            setShow(!show);
            dispatch(updateCurrentVerify(undefined));
        }
    };

    const deleteImage = (id) => {
        const newImageData = imageData.filter((item) => item.id !== id);
        if (newImageData.length == 0) {
            setImageData([
                {
                    id: "default",
                    url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678977390/coobus/no-intro_s0lnmn.png",
                },
            ]);
        } else {
            setImageData(newImageData);
        }
    };

    const { control, setValue, handleSubmit } = useForm({
        mode: "onChange",
    });
    const handleVerify = (values) => {
        let standard = Object.keys(values);
        console.log(values);
        let verify = [];
        for (let i = 0; i < standard.length; ++i) {
            if (values[standard[i]]) {
                verify.push(standard[i]);
            }
        }
        let verifyLink = imageData.map((item, index) => {
            if (item.id !== "default") return item.url;
        });
        verifyLink = verifyLink.join(", ");
        const data = {
            verify: verify.sort().join(", "),
            checkVerify:
                verify.length === 0
                    ? null !== currentVerify.SP_Chuan
                    : verify.sort().join(", ") !== currentVerify.SP_Chuan,
            verifyLink,
            checkVerifyLink: verifyLink !== currentVerify.SP_MinhChung,
            SP_MaSP: currentVerify.SP_MaSP,
        };
        if (!data.checkVerify && !data.checkVerifyLink) {
            toast.success("Xác nhận thành công", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            dispatch({
                type: "QTVBD_CONFIRM_VERIFY",
                payload: { token: accessToken, data },
            });
        }
    };
    useEffect(() => {
        const imageData = currentVerify?.SP_MinhChung?.split(", ").map(
            (link, index) => ({ id: index, url: link })
        ) || [
            {
                id: 0,
                url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png",
            },
        ];
        setImageData(imageData);
        if (currentVerify && currentVerify.SP_Chuan) {
            let listChuan = currentVerify.SP_Chuan.split(", ");
            for (let i = 0; i < listChuan.length; ++i) {
                setValue(listChuan[i], true);
            }
        } else {
            setValue("OCOP", false);
            setValue("VietGAP", false);
            setValue("GlobalGAP", false);
        }
    }, [currentVerify]);
    return (
        <div className="admin-account h-full py-3 px-5">
            <div className=" admin-account__title font-bold text-2xl ">
                Quản lý chuẩn sản phẩm
            </div>
            <div className="content">
                {!show ? (
                    <>
                        <div className="tool-page p-1 text-right">
                            <button
                                className="px-2 py-1 border-2 border-primary-color rounded-xl h-full"
                                disabled={page === 1}
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                            >
                                <i className="fa-solid fa-angle-left text-primary-color"></i>
                            </button>
                            <span className="mx-2">
                                {page}/{totalPage}
                            </span>
                            <button
                                className="px-2 py-1 border-2 border-primary-color rounded-xl h-full"
                                disabled={page === totalPage}
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            >
                                <i className="fa-solid fa-angle-right text-primary-color"></i>
                            </button>
                        </div>
                        <div className="product grid grid-cols-10 gap-6 mt-3">
                            {productVerify &&
                                productVerify
                                    .slice(page * 10 - 10, page * 10)
                                    .map((data, index) => (
                                        <div
                                            className="col-span-2 rounded-lg box-shadow-custom h-[255px] flex flex-col gap-1 cursor-pointer"
                                            key={index}
                                            onClick={() => {
                                                handleShow(data);
                                            }}
                                        >
                                            <div className="img h-[60%]">
                                                <img
                                                    src={data.SP_AnhDaiDien}
                                                    alt=""
                                                    className="w-full rounded-t-lg h-full object-cover"
                                                />
                                            </div>
                                            <div className="info px-2">
                                                <div className="name font-bold text-lg text-1-line mb-1">
                                                    {data.SP_TenSanPham}
                                                </div>
                                                <div
                                                    className={`unit ${
                                                        data.SP_Chuan !== null
                                                            ? "mb-2"
                                                            : "mb-1"
                                                    }`}
                                                >
                                                    {data.DV_TenDonVi}
                                                </div>
                                                {productVerify &&
                                                data.SP_Chuan !== null ? (
                                                    <ProductStandard
                                                        standards={["OCOP"]}
                                                        standardColor={
                                                            standardColor
                                                        }
                                                    ></ProductStandard>
                                                ) : (
                                                    <div className="italic text-red-700">
                                                        *Chưa có chuẩn
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </>
                ) : (
                    <div className="h-[580px] box-shadow-custom mt-2 rounded-lg grid grid-cols-2 gap-3 relative">
                        <div className="col-span-2 mt-2 text-center font-bold text-2xl">
                            Thông tin sản phẩm
                        </div>
                        <div className="col-span-1 p-4">
                            <div className="w-full img flex justify-center flex-col items-center">
                                <img
                                    src={
                                        currentVerify &&
                                        currentVerify.SP_AnhDaiDien
                                    }
                                    alt=""
                                    className="w-[250px] h-[250px] object-cover rounded-lg"
                                />
                                <span className="font-bold text-xl mt-5">
                                    {currentVerify.SP_TenSanPham}
                                </span>
                            </div>
                            <div className="info mt-3 text-lg [&>*]:mb-2">
                                <div className="unit">
                                    <span className="font-bold">Đơn vị: </span>
                                    <span>{currentVerify.DV_TenDonVi}</span>
                                </div>
                                <div className="address">
                                    <span className="font-bold">Địa chỉ: </span>
                                    <span>
                                        {currentVerify.DCCT_TenDiaChi},{" "}
                                        {currentVerify.XP_TenXaPhuong},{" "}
                                        {currentVerify.QH_TenQuanHuyen},{" "}
                                        {currentVerify.TT_TenTinhThanh}
                                    </span>
                                </div>
                                <div className="number">
                                    <span className="font-bold">
                                        Khả năng cung ứng:{" "}
                                    </span>
                                    <span>
                                        {currentVerify.SP_SoLuongCungCau}{" "}
                                        /&nbsp;
                                        {currentVerify.SP_ChuKyCungCau}
                                    </span>
                                </div>
                                <div className="price">
                                    <span className="font-bold">Giá: </span>
                                    <span>
                                        {currentVerify.GSP_Gia} /&nbsp;1&nbsp;
                                        {currentVerify.GSP_DonViTinh}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 p-4 flex flex-col items-center justify-center">
                            <ProductDescSlider
                                imageData={imageData}
                                customClass="w-[370px] h-[370px]"
                                edit={true}
                                deleteImage={deleteImage}
                            ></ProductDescSlider>
                            <div className="mt-10">
                                <div className="flex gap-5 items-center">
                                    <span>Đạt chuẩn: </span>

                                    <Checkbox
                                        control={control}
                                        label="OCOP"
                                        name="OCOP"
                                        id="OCOP"
                                        value="OCOP"
                                    ></Checkbox>
                                    <Checkbox
                                        control={control}
                                        label="VietGAP"
                                        name="VietGAP"
                                        id="VietGAP"
                                        value="VietGAP"
                                    ></Checkbox>
                                    <Checkbox
                                        control={control}
                                        label="GlobalGAP"
                                        name="GlobalGAP"
                                        id="GlobalGAP"
                                        value="GlobalGAP"
                                    ></Checkbox>
                                </div>
                            </div>
                            <div className="mt-5 flex gap-5">
                                <button className="bg-secondary-color p-2 text-white font-bold rounded-lg  hover:bg-hover-secColor">
                                    Yêu cầu thông tin
                                </button>
                                <button
                                    className="bg-primary-color p-2 text-white font-bold rounded-lg  hover:bg-hover-priColor w-[140px]"
                                    onClick={handleSubmit(handleVerify)}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                        <div
                            className="absolute top-2 right-2 w-10 h-10 p-3 flex justify-center items-center bg-secondary-color rounded-full text-xl font-bold text-white cursor-pointer"
                            onClick={() => {
                                dispatch(updateCurrentVerify(undefined));
                                setShow(!show);
                            }}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdPostVerify;
