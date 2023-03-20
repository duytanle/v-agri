import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../CustomForm/Input";
import EmployeeAvatar from "../Employees/EmployeeAvatar";
import Dropdown from "../../CustomForm/Dropdown";
import { dnCreateProduct } from "../../../store/dn/dn-slice.js";
import axios from "../../../api/axios";
const ProductFormDN = ({ handleCloseAdd }) => {
    //Redux
    const { category } = useSelector((state) => state.product);
    const { userUnit, accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //State
    const [checkImageProduct, setCheckImageProduct] = useState(false);
    const [resetForm, setResetForm] = useState(false);

    //Validate Form
    const validationSchema = yup.object({
        productName: yup.string(50).required("Vui lòng nhập tên sản phẩm"),
        productCategory: yup.string(50).oneOf(
            category.map((item) => item.DMSP_MaDMSP),
            "Vui lòng chọn danh mục sản phẩm"
        ),
        productAbility: yup
            .number()
            .typeError("Vui lòng điền số cho khả năng cung ứng"),
        productAbilityUnit: yup
            .string()
            .oneOf(
                [
                    "kg",
                    "mét khối",
                    "tấn",
                    "cành",
                    "cây",
                    "con",
                    "quả",
                    "bó",
                    "lít",
                ],
                "Vui lòng chọn đơn vị tính"
            ),
        productDesc: yup.string().required("Vui lòng nhập mô tả"),
    });

    //Create Form
    const {
        control,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
        register,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    //Create Dropdown data
    const dropdownCategory = [
        {
            name: "Chọn danh mục",
            value: "default",
        },
        ...category.map((item) => {
            return { name: item.DMSP_TenDanhMuc, value: item.DMSP_MaDMSP };
        }),
    ];
    const dropdownProductAbilityUnit = [
        { name: "Chọn đơn vị ", value: "default" },
        ...[].concat(
            ...category
                .filter((item) => watch("productCategory") === item.DMSP_MaDMSP)
                .map((item) => {
                    const DVT = item.DMSP_DonViTinh.split(", ");
                    return DVT.map((dvt) => {
                        return { name: dvt, value: dvt };
                    });
                })
        ),
    ];
    const handleResetForm = () => {
        reset({
            productName: "",
            productCategory: "default",
            productAbility: "",
            productAbilityUnit: "default",
            productTimeApply: "",
            productTimeApplyUnit: "default",
            productDesc: "",
            productImage: "default",
        });
        setResetForm(!resetForm);
    };
    const handleUpdate = async (values) => {
        if (!values.productImage) {
            setCheckImageProduct(true);
        } else {
            setCheckImageProduct(false);
            let resUploadProductImage = "";
            if (values.productImage) {
                const uploadImage = new FormData();
                uploadImage.append("image", values.productImage, "file");
                resUploadProductImage = await axios.post(
                    "/dn/upload-image",
                    uploadImage,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            }
            const product = {
                DV_MaDV: userUnit.DV_MaDV,
                LSP_MaLSP: userUnit.LDV_MaLDV,
                DMSP_MaDMSP: values.productCategory,
                SP_TenSanPham: values.productName,
                SP_SoLuongCungCau: `${values.productAbility} ${values.productAbilityUnit}`,
                SP_AnhDaiDien: resUploadProductImage?.data?.path || "",
                SP_MoTa: values.productDesc,
            };
            dispatch(dnCreateProduct({ token: accessToken, product }));
            handleResetForm();
        }
    };
    return (
        <form className="manage-product-info mt-5 relative">
            <div className="manage-product-name text-center">
                <Input
                    control={control}
                    name="productName"
                    id="productName"
                    placeholder="Nhập tên sản phẩm"
                    customClass={
                        "border-b-2 border-b-primary-color p-2 font-bold text-3xl w-[90%] text-center"
                    }
                ></Input>
                {errors.productName ? (
                    <p className="text-red-700 text-sm">
                        {errors.productName.message}
                    </p>
                ) : null}
            </div>
            <div className="manage-product-card h-[80%] grid grid-cols-12  mt-2">
                <div className="productImage col-span-4 flex flex-col items-center ">
                    <EmployeeAvatar
                        control={control}
                        setValue={setValue}
                        name="productImage"
                        id="productImage"
                        customClass={`unit-logo col-span-4 h-[300px] w-[300px] shrink-0 p-4 ${
                            Object.keys(errors).length > 0 ? "mt-5" : "my-auto"
                        }`}
                        defaultAvatar="https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                        setCheckImageProduct={setCheckImageProduct}
                    >
                        <div className="mt-10">
                            {checkImageProduct ? (
                                <div className="text-red-700 text-center">
                                    Vui lòng chọn hình ảnh cho sản phẩm
                                </div>
                            ) : null}
                        </div>
                    </EmployeeAvatar>
                </div>
                <div
                    className={` max-w-[700px] col-span-8 ${
                        Object.keys(errors).length > 0
                            ? "[&>*]:my-4"
                            : "[&>*]:my-6"
                    } `}
                >
                    <div className="manage-product-category text-lg my-2 grid grid-cols-12 gap-x-2 gap-y-1 w-full last:my-0">
                        <label
                            htmlFor="productCategory"
                            className="font-bold col-span-3"
                        >
                            Thuộc danh mục:
                        </label>
                        <Dropdown
                            control={control}
                            setValue={setValue}
                            labelDefault="Danh mục sản phẩm"
                            dropdownData={dropdownCategory}
                            name="productCategory"
                            id="productCategory"
                            customTitle="w-[220px]  px-2 py-[2px] "
                            customClass="w-max col-span-9"
                            customListData="h-[200px] overflow-y-scroll"
                        ></Dropdown>
                        {errors.productCategory ? (
                            <>
                                <p className="col-span-3"></p>
                                <p className="text-red-700 text-sm col-span-9  ">
                                    {errors.productCategory.message}
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div className="manage-product-ability text-lg my-2 grid grid-cols-12 gap-3  w-full last:my-0 items-center">
                        <label
                            htmlFor="productAbility"
                            className="font-bold col-span-3"
                        >
                            Nhu cầu:
                        </label>

                        <Input
                            control={control}
                            name="productAbility"
                            id="productAbility"
                            placeholder="30"
                            customClass="border-b-2 border-primary-color col-span-1 "
                        ></Input>

                        <Dropdown
                            control={control}
                            setValue={setValue}
                            name="productAbilityUnit"
                            id="productAbilityUnit"
                            labelDefault="Đơn vị tính"
                            customTitle="w-[130px] px-2 py-[2px]"
                            customClass="w-max col-span-3"
                            dropdownData={dropdownProductAbilityUnit}
                        ></Dropdown>

                        <span>/</span>

                        <Input
                            control={control}
                            name="productTimeApply"
                            id="productTimeApply"
                            placeholder="30"
                            customClass="border-b-2 border-primary-color col-span-1 "
                        ></Input>

                        <Dropdown
                            control={control}
                            setValue={setValue}
                            name="productTimeApplyUnit"
                            id="productTimeApplyUnit"
                            labelDefault="Thời hạn"
                            customTitle="w-[150px] px-2 py-[2px] "
                            customClass="w-max col-span-3"
                            dropdownData={[
                                { name: "Chọn thời hạn", value: "default" },
                                { name: "ngày", value: "ngày" },
                                { name: "tháng", value: "tháng" },
                                { name: "năm", value: "năm" },
                            ]}
                        ></Dropdown>

                        {errors.productAbility ||
                        errors.productAbilityUnit ||
                        errors.productTimeApply ||
                        errors.productTimeApplyUnit ? (
                            <>
                                <p className="col-span-3"></p>
                                <p className="text-red-700 text-sm col-span-9">
                                    {errors.productAbility?.message ||
                                        errors.productAbilityUnit?.message ||
                                        errors.productTimeApply?.message ||
                                        errors.productTimeApplyUnit?.message}
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div
                        className={`col-span-6 flex flex-col ${
                            Object.keys(errors).length > 0
                                ? "h-[250px]"
                                : "h-[280px]"
                        } `}
                    >
                        <label
                            htmlFor="productDesc"
                            className="font-bold text-lg"
                        >
                            Mô tả sản phẩm:
                        </label>
                        <textarea
                            {...register("productDesc")}
                            name="productDesc"
                            id="productDesc"
                            rows="30"
                            className="w-full border-2 border-primary-color outline-none rounded-xl p-2 resize-none mt-2"
                        ></textarea>
                        {errors.productDesc ? (
                            <>
                                <p className="text-red-700 text-sm ">
                                    {errors.productDesc.message}
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div
                        className={`setting-unit-button w-full flex justify-center gap-12 ${
                            Object.keys(errors).length > 0 ? "-mt-5" : ""
                        }`}
                    >
                        <button
                            className="setting-unit-reset bg-secondary-color p-2 rounded-lg font-bold text-white min-w-[140px]"
                            onClick={(event) => {
                                event.preventDefault();
                                handleResetForm();
                            }}
                        >
                            Đặt lại
                        </button>
                        <button
                            className="setting-unit-update bg-primary-color rounded-lg p-2 font-bold text-white min-w-[120px]"
                            onClick={handleSubmit(handleUpdate)}
                        >
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="absolute -top-[50px] right-0 bg-secondary-color text-white flex justify-center items-center p-1 rounded-full w-10 h-10 font-bold text-lg hover:bg-hover-secColor cursor-pointer"
                onClick={handleCloseAdd}
            >
                <i className="fa-solid fa-xmark"></i>
            </div>
        </form>
    );
};

export default ProductFormDN;
