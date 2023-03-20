import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ProductFormCE from "./ProductFormCE";
import { useDispatch, useSelector } from "react-redux";
import { htxCreateProduct } from "../../../store/htx/htx-slice";
import axios from "../../../api/axios";
const ProductAdd = ({ handleCloseAdd }) => {
    const [checkImageProduct, setCheckImageProduct] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const { category } = useSelector((state) => state.product);
    const { accessToken, userUnit } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
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
        productTimeApply: yup
            .number()
            .typeError("Vui lòng điền số cho đơn vị thời gian"),
        productTimeApplyUnit: yup
            .string()
            .oneOf(
                ["ngày", "tháng", "năm"],
                "Vui lòng chọn đơn vị tính thời hạn"
            ),
        productPrice: yup
            .number()
            .typeError("Vui lòng điền số cho giá sản phẩm"),
        productPriceUnit: yup
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
        productDesc: yup.string().required("Vui lòng điền mô tả cho sản phẩm"),
    });

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
    const handleResetForm = () => {
        reset({
            productName: "",
            productCategory: "default",
            productAbility: "",
            productAbilityUnit: "default",
            productTimeApply: "",
            productTimeApplyUnit: "default",
            productPrice: "",
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
            let resUploadProductImageVerify = [];
            let resUploadProductImageDesc = [];
            if (values.productImage) {
                const uploadImage = new FormData();
                uploadImage.append("image", values.productImage, "file");
                resUploadProductImage = await axios.post(
                    "/htx/upload-image",
                    uploadImage,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            }
            if (values.productImageVerify?.length > 0) {
                const uploadImageVerify = new FormData();
                Array.from(values.productImageVerify).forEach((file) => {
                    uploadImageVerify.append("images", file, "file");
                });

                resUploadProductImageVerify = await axios.post(
                    "/htx/upload-images",
                    uploadImageVerify,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            }
            if (values.productImageDesc?.length > 0) {
                const uploadImageDesc = new FormData();
                Array.from(values.productImageDesc).forEach((file) => {
                    uploadImageDesc.append("images", file, "file");
                });

                resUploadProductImageDesc = await axios.post(
                    "/htx/upload-images",
                    uploadImageDesc,
                    {
                        headers: {
                            contentType: false,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            }

            const data = {
                DV_MaDV: userUnit.DV_MaDV,
                LSP_MaLSP: userUnit.LDV_MaLDV,
                DMSP_MaDMSP: values.productCategory,
                SP_TenSanPham: values.productName,
                SP_SoLuongCungCau: `${values.productAbility} ${values.productAbilityUnit}`,
                SP_ChuKyCungCau: `${values.productTimeApply} ${values.productTimeApplyUnit}`,
                SP_AnhDaiDien: resUploadProductImage?.data?.path || "",
                SP_MoTa: values.productDesc,
                SP_AnhMoTa:
                    resUploadProductImageDesc?.data?.paths.join(", ") || "",
                SP_MinhChung:
                    resUploadProductImageVerify?.data?.paths.join(", ") || "",
                GSP_Gia: values.productPrice,
                GSP_DonViTinh: values.productPriceUnit,
            };
            dispatch(htxCreateProduct({ token: accessToken, product: data }));
            handleResetForm();
        }
    };
    return (
        <form className="manage-product-add p-5 mt-5 box-shadow-custom rounded-xl relative">
            <div
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-secondary-color p-1 flex justify-center items-center cursor-pointer hover:bg-hover-secColor"
                onClick={() => handleCloseAdd()}
            >
                <i className="fa-solid fa-xmark text-white font-bold"></i>
            </div>
            <div className="form-name font-bold text-2xl text-center">
                Thêm sản phẩm mới
            </div>
            <ProductFormCE
                resetForm={resetForm}
                control={control}
                setValue={setValue}
                register={register}
                errors={errors}
                checkImageProduct={checkImageProduct}
                setCheckImageProduct={setCheckImageProduct}
                watch={watch}
            ></ProductFormCE>
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
        </form>
    );
};

export default ProductAdd;
