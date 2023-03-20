import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../CustomForm/Input";
import EmployeeAvatar from "../Employees/EmployeeAvatar";
import ProductDescSlider from "../../ProductDetail/ProductDescSlider";
import Dropdown from "../../CustomForm/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateImage } from "../../../store/htx/htx-request";
import {
    htxUpdateInfo,
    htxUploadImage,
    htxUploadImages,
} from "../../../store/htx/htx-slice";
import { getToken } from "../../../utils/auth";
import axios from "../../../api/axios";
const SettingUnit = () => {
    const { province, district, commune } = useSelector(
        (state) => state.address
    );

    const { userUnit } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [imageVerify, setImageVerify] = useState([]);
    const [fileImageVerify, setFileImageVerify] = useState([]);

    const dropdownDataProvice = [
        { value: "default", name: "Chọn tỉnh thành" },
        ...province.map((item) => {
            return { value: item.TT_MaTT, name: item.TT_TenTinhThanh };
        }),
    ];

    const validationSchema = yup.object({
        unitName: yup.string(50).required("Vui lòng nhập tên đơn vị"),
        unitField: yup.string(50).required("Vui lòng nhập lĩnh vực"),
        unitEmail: yup
            .string(30)
            .email("Email chưa đúng định dạng")
            .required("Vui lòng nhập email"),
        unitPhone: yup
            .string(10)
            .max(10, "Tối đa 10 số")
            .required("Vui lòng nhập số điện thoại"),
        unitAddress: yup.string(50).required("Vui lòng nhập địa chỉ"),
        unitDesc: yup.string().required("Vui lòng nhập mô tả"),
    });

    const unitImageVerify =
        userUnit.DV_MinhChung?.split(", ").map((link, index) => {
            return { id: index, url: link };
        }) || [];

    const {
        control,
        formState: { errors },
        setValue,
        setError,
        handleSubmit,
        register,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            unitName: userUnit.DV_TenDonVi || "",
            unitField: userUnit.DV_LinhVuc || "",
            unitEmail: userUnit.DV_Email || "",
            unitPhone: userUnit.DV_DienThoai || "",
            unitAddress: userUnit.DCCT_TenDCCT || "",
            unitDesc: userUnit.DV_MoTa || "",
            unitProvince: userUnit.TT_MaTT || "default",
            unitDistrict: userUnit.QH_MaQH || "default",
            unitCommune: userUnit.XP_MaXP || "default",
            unitImageVerify: [],
            unitAvatar: "",
        },
    });
    const watchTT = useWatch({
        control,
        name: "unitProvince",
        defaultValue: userUnit.TT_MaTT || "default",
    });
    const watchQH = useWatch({
        control,
        name: "unitDistrict",
        defaultValue: userUnit.QH_MaQH || "default",
    });

    const dropdownDataDistrict = [
        { value: "default", name: "Chọn quận huyện" },
        ...district
            .filter((item) => item.TT_MaTT === watchTT)
            .map((item) => {
                return { value: item.QH_MaQH, name: item.QH_TenQuanHuyen };
            }),
    ];
    const dropdownDataCommune = [
        { value: "default", name: "Chọn xã phường" },
        ...commune
            .filter((item) => item.QH_MaQH === watchQH)
            .map((item) => {
                return { value: item.XP_MaXP, name: item.XP_TenXaPhuong };
            }),
    ];

    const handleResetForm = (event) => {
        event.preventDefault();
        reset({
            unitName: userUnit.DV_TenDonVi || "",
            unitField: userUnit.DV_LinhVuc || "",
            unitEmail: userUnit.DV_Email || "",
            unitPhone: userUnit.DV_DienThoai || "",
            unitAddress: userUnit.DCCT_TenDCCT || "",
            unitDesc: userUnit.DV_MoTa || "",
            unitImageVerify,
        });
    };
    const handleImageVerify = (event) => {
        const files = event.target.files;
        const fileString = Array.from(files).map((file) => {
            return {
                id: file.name,
                url: URL.createObjectURL(file),
            };
        });
        setImageVerify([...imageVerify, ...fileString]);

        setFileImageVerify([...fileImageVerify, ...files]);
        setValue("unitImageVerify", [...fileImageVerify, ...files]);
    };

    const handleUpdate = async (values) => {
        const checkAddress = [
            {
                name: "unitProvince",
                value: values.unitProvince,
                error: "Chọn tỉnh thành",
            },
            {
                name: "unitDistrict",
                value: values.unitDistrict,
                error: "Chọn quận huyện",
            },
            {
                name: "unitCommune",
                value: values.unitCommune,
                error: "Chọn xã phường",
            },
        ];
        checkAddress.forEach((address) => {
            if (address.value === "default") {
                setError(address.name, { message: address.error });
            }
        });
        if (
            !errors?.unitProvince &&
            !errors?.unitDistrict &&
            !errors?.unitCommune
        ) {
            const { access_token } = getToken();
            let resUploadImage = "";
            let resUploadImages = [];
            console.log(values);
            if (values.unitAvatar) {
                const uploadAvatar = new FormData();
                uploadAvatar.append("image", values.unitAvatar, "file");
                resUploadImage = await axios.post(
                    "/htx/upload-image",
                    uploadAvatar,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
            }
            if (values.unitImageVerify.length > 0) {
                const uploadImageVerify = new FormData();
                Array.from(values.unitImageVerify).forEach((file) => {
                    uploadImageVerify.append("images", file, "file");
                });

                resUploadImages = await axios.post(
                    "/htx/upload-images",
                    uploadImageVerify,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
            }

            const data = {
                XP_MaXP: values.unitCommune,
                DCCT_MaDCCT: userUnit.DCCT_MaDCCT,
                DCCT_TenDiaChi: values.unitAddress,
                DV_MaDV: userUnit.DV_MaDV,
                DV_Logo: resUploadImage?.data?.path || "",
                DV_DienThoai: values.unitPhone,
                DV_Email: values.unitEmail,
                DV_LinhVuc: values.unitField,
                DV_MoTa: values.unitDesc,
                DV_MinhChung: resUploadImages?.data?.paths.join(", ") || "",
            };
            dispatch(htxUpdateInfo({ token: access_token, data }));
            // console.log(data);
        }
    };
    useEffect(() => {
        if (watchTT !== userUnit.TT_MaTT) {
            setValue("unitDistrict", "default");
        }
    }, [watchTT]);
    useEffect(() => {
        if (watchQH !== userUnit.QH_MaQH) {
            setValue("unitCommune", "default");
        }
    }, [watchQH]);
    useEffect(() => {
        setImageVerify([...imageVerify, ...unitImageVerify]);
    }, []);
    return (
        <div className="setting-info relative z-0 h-full animate__animated animate__fadeIn ">
            <div className="info-background h-[1570px] ">
                <div className="bg-img h-full">
                    <img
                        src="/images/infoBG.jpg"
                        alt=""
                        className="h-full w-full object-cover rounded-[15px]"
                    />
                </div>
                <div className="info-bg-title absolute top-7 left-1/2 -translate-x-1/2 font-bold text-4xl text-white tracking-wider">
                    THÔNG TIN CHI TIẾT
                </div>
            </div>
            <form className="info-card absolute top-[15%] w-[90%] bg-white rounded-[35px] left-1/2 -translate-x-1/2 shadow-2xl">
                <div className="grid grid-cols-11 mt-2 h-full px-4">
                    <div className="info-basic col-span-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <p className="info-id text-lg my-3">
                            <span className="font-bold col-span-4">
                                Mã đơn vị:
                            </span>
                            <span className="col-span-8">
                                {userUnit.DV_MaDV}
                            </span>
                        </p>
                        <p className="info-type text-lg my-3">
                            <span className="font-bold col-span-4">
                                Loại đơn vị:
                            </span>
                            <span className="col-span-8">
                                {userUnit.LDV_MaLDV === "HTX"
                                    ? "Hợp tác xã"
                                    : "Doanh nghiệp"}
                            </span>
                        </p>
                        <div className="unit-field text-lg my-3">
                            <label
                                htmlFor="unitName"
                                className="font-bold  col-span-4"
                            >
                                Tên đơn vị:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitName"
                                id="unitName"
                                placeholder="Tên đầy đủ của đơn vị"
                                customClass="border-b-2 border-primary-color col-span-8"
                            ></Input>
                            {errors.unitName ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.unitName.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="unit-field text-lg my-3">
                            <label
                                htmlFor="unitField"
                                className="font-bold  col-span-4"
                            >
                                Lĩnh vực:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitField"
                                id="unitField"
                                placeholder="Lĩnh vực hoạt động"
                                customClass="border-b-2 border-primary-color col-span-8"
                            ></Input>
                            {errors.unitField ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.unitField.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="unit-email text-lg my-3">
                            <label
                                htmlFor="unitEmail"
                                className="font-bold  col-span-4"
                            >
                                Email:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitEmail"
                                id="unitEmail"
                                placeholder="Email liên hệ"
                                customClass="border-b-2 border-primary-color col-span-8"
                            ></Input>
                            {errors.unitEmail ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.unitEmail.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className=" col-span-3 relative p-4 flex-shrink-0 ml-2">
                        <EmployeeAvatar
                            control={control}
                            setValue={setValue}
                            name="unitAvatar"
                            id="unitAvatar"
                            customClass={`unit-logo col-span-3 h-[230px]  p-4 w-[230px]  ${
                                Object.keys(errors).length > 0
                                    ? "mt-5"
                                    : "my-auto"
                            }`}
                            defaultAvatar={
                                userUnit.DV_Logo ||
                                "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                            }
                        ></EmployeeAvatar>
                    </div>
                    <div className="info-basic col-span-4 flex flex-col justify-start items-start [&>*]:grid [&>*]:grid-cols-12 [&>*]:gap-2 [&>*]:w-full">
                        <div className="unit-phone text-lg my-3">
                            <label
                                htmlFor="unitPhone"
                                className="font-bold  col-span-4"
                            >
                                Điện thoại:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitPhone"
                                id="unitPhone"
                                placeholder="Điện thoại liên hệ"
                                customClass="border-b-2 border-primary-color col-span-8"
                            ></Input>
                            {errors.unitPhone ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.unitPhone.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="unit-phone text-lg my-3">
                            <label
                                htmlFor="unitPhone"
                                className="font-bold  col-span-4"
                            >
                                Địa chỉ:
                            </label>
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Tỉnh Thành"
                                customTitle="p-1"
                                customClass="col-span-8"
                                customListData="h-[200px] overflow-y-scroll"
                                dropdownData={dropdownDataProvice}
                                name="unitProvince"
                                id="unitProvince"
                                defaultValue={userUnit.TT_MaTT}
                            ></Dropdown>
                            {errors.unitProvince ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.unitProvince.message}
                                    </p>
                                </>
                            ) : null}
                            <div className="col-span-4"></div>
                            <div className="col-span-8">
                                <Dropdown
                                    control={control}
                                    setValue={setValue}
                                    labelDefault="Quận huyện"
                                    customTitle="p-1 "
                                    customClass="col-span-6 mt-3"
                                    customListData="h-[200px] overflow-y-scroll"
                                    dropdownData={dropdownDataDistrict}
                                    name="unitDistrict"
                                    id="unitDistrict"
                                    defaultValue={userUnit.QH_MaQH}
                                ></Dropdown>
                                {errors.unitDistrict ? (
                                    <p className="text-red-700 text-sm col-span-6">
                                        {errors.unitDistrict.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className="col-span-4"></div>
                            <div className="col-span-8">
                                <Dropdown
                                    control={control}
                                    setValue={setValue}
                                    labelDefault="Xã phường"
                                    customTitle="p-1 "
                                    customClass="col-span-6 mt-3"
                                    customListData="h-[200px] overflow-y-scroll"
                                    dropdownData={dropdownDataCommune}
                                    name="unitCommune"
                                    id="unitCommune"
                                    defaultValue={userUnit.XP_MaXP}
                                ></Dropdown>

                                {errors.unitCommune ? (
                                    <p className="text-red-700 text-sm ">
                                        {errors.unitCommune.message}
                                    </p>
                                ) : null}
                            </div>
                            <Input
                                type="text"
                                control={control}
                                name="unitAddress"
                                id="unitAddress"
                                placeholder="Địa chỉ cụ thể:"
                                customClass="border-b-2 border-primary-color col-span-12 mt-3"
                            ></Input>
                            {errors.unitAddress ? (
                                <p className="text-red-700 text-sm col-span-12">
                                    {errors.unitAddress.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="info-desc-verify px-4 pt-5 grid grid-cols-11 gap-5 mt-2 ">
                    <div className="info-desc my-3 col-span-4 flex flex-col  ">
                        <label
                            htmlFor="unitDesc"
                            className="font-bold  text-lg pb-4"
                        >
                            Mô tả:
                        </label>
                        <textarea
                            {...register("unitDesc")}
                            name="unitDesc"
                            id="unitDesc"
                            rows="15"
                            className="border-2 border-primary-color outline-none resize-none mt-2 rounded-lg p-2"
                            placeholder="Nhập thông tin mô tả"
                        ></textarea>

                        {errors.unitDesc ? (
                            <p className="text-red-700 text-sm">
                                {errors.unitDesc.message}
                            </p>
                        ) : null}
                    </div>
                    <div className="info-verify my-3 col-span-7">
                        <div className="text-lg font-bold flex gap-10 items-center">
                            <span>Ảnh minh chứng:</span>
                            <label className="choose-image bg-primary-color py-2 px-5 rounded-lg text-white text-center cursor-pointer hover:bg-hover-priColor">
                                <span>Chọn ảnh</span>

                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageVerify}
                                />
                            </label>
                        </div>
                        {imageVerify?.length > 0 ? (
                            <ProductDescSlider
                                imageData={imageVerify}
                                customClass="w-full h-[900px] mt-2"
                            ></ProductDescSlider>
                        ) : (
                            <div className="text-secondary-color text-lg font-bold mt-2 h-[900px]">
                                Đơn vị chưa có ảnh minh chứng
                            </div>
                        )}
                    </div>
                </div>
                <div className="info-desc-verify px-10 mt-[50px] mb-[20px] items-start w-full">
                    <div className="mx-auto flex justify-center gap-[50px]">
                        <div
                            className="p-2 min-w-[165px] bg-secondary-color rounded-lg font-bold text-white text-lg text-center cursor-pointer hover:bg-hover-secColor"
                            onClick={handleResetForm}
                        >
                            Đặt lại
                        </div>
                        <div
                            className="p-2 min-w-[165px] bg-primary-color rounded-lg font-bold text-white text-lg text-center cursor-pointer hover:bg-hover-priColor"
                            onClick={handleSubmit(handleUpdate)}
                        >
                            Cập nhật
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingUnit;
