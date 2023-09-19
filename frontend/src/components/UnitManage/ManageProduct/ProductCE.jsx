import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ProductFormCE from "./ProductFormCE";
import { useDispatch, useSelector } from "react-redux";
import { htxCreateProduct } from "../../../store/htx/htx-slice";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
const ProductCE = ({ handleCloseAdd, ...props }) => {
    const [checkImageProduct, setCheckImageProduct] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [completeTask, setCompleteTask] = useState(false);
    const { category, productDetail } = useSelector((state) => state.product);
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
    const checkEditProduct = () => {
        if (Object.keys(productDetail).length > 0) {
            return {
                defaultValues: {
                    productName: productDetail.SP_TenSanPham,
                    productCategory: productDetail.DMSP_MaDMSP,
                    productAbility:
                        productDetail.SP_SoLuongCungCau.split(" ")[0],
                    productAbilityUnit:
                        productDetail.SP_SoLuongCungCau.split(" ")[1],
                    productTimeApply:
                        productDetail.SP_ChuKyCungCau.split(" ")[0],
                    productTimeApplyUnit:
                        productDetail.SP_ChuKyCungCau.split(" ")[1],
                    productPrice: productDetail.GSP_Gia,
                    productPriceUnit: productDetail.GSP_DonViTinh,
                    productDesc: productDetail.SP_MoTa,
                    productImage: productDetail.SP_AnhDaiDien,
                    proPercent: productDetail.KM_PhanTram || "",
                },
            };
        } else return {};
    };
    const {
        control,
        setError,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
        register,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        ...checkEditProduct(),
    });
    const handleResetForm = () => {
        if (Object.keys(productDetail).length > 0) {
            reset({
                productName: productDetail.SP_TenSanPham,
                productCategory: productDetail.DMSP_MaDMSP,
                productAbility: productDetail.SP_SoLuongCungCau.split(" ")[0],
                productAbilityUnit:
                    productDetail.SP_SoLuongCungCau.split(" ")[1],
                productTimeApply: productDetail.SP_ChuKyCungCau.split(" ")[0],
                productTimeApplyUnit:
                    productDetail.SP_ChuKyCungCau.split(" ")[1],
                productPrice: productDetail.GSP_Gia,
                productPriceUnit: productDetail.GSP_DonViTinh,
                productDesc: productDetail.SP_MoTa,
                productImage: productDetail.SP_AnhDaiDien,
                proPercent: productDetail.KM_PhanTram || "",
            });
            setResetForm(!resetForm);
        } else {
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
        }
    };
    const handleCreateProduct = async (values) => {
        if (typeof values.productImage !== "object") {
            setCheckImageProduct(true);
        } else {
            if (
                values.promotion &&
                !(
                    (values.proPercent && values.proStart && values.proEnd) ||
                    (!values.proPercent && !values.proStart && !values.proEnd)
                )
            ) {
                if (values.proPercent >= 100) {
                    setError("proPercent", {
                        message: "Khuyến mãi thấp hơn 100%",
                    });
                } else {
                    setError("proPercent", {
                        message: "Vui lòng điền đầy đủ thông tin khuyến mãi",
                    });
                }
            } else {
                setCompleteTask(true);
                setCheckImageProduct(false);
                let resUploadProductImage = "";
                let resUploadProductImageVerify = [];
                let resUploadProductImageDesc = [];

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

                const product = {
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
                        resUploadProductImageVerify?.data?.paths.join(", ") ||
                        "",
                    GSP_Gia: values.productPrice,
                    GSP_DonViTinh: values.productPriceUnit,
                    KM_PhanTram: values.proPercent,
                    KM_NgayBatDau: values.proStart
                        .split("-")
                        .reverse()
                        .join("/"),
                    KM_NgayKetThuc: values.proEnd
                        .split("-")
                        .reverse()
                        .join("/"),
                };
                const response = await axios.post(
                    "/htx/create-product",
                    product,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setCompleteTask(false);
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                handleResetForm();
            }
        }
    };
    const handleEditProduct = async (values) => {
        if (
            values.promotion &&
            !(
                (values.proPercent && values.proStart && values.proEnd) ||
                (!values.proPercent && !values.proStart && !values.proEnd)
            )
        ) {
            if (values.proPercent >= 100) {
                setError("proPercent", {
                    message: "Khuyến mãi thấp hơn 100%",
                });
            } else {
                setError("proPercent", {
                    message: "Vui lòng điền đầy đủ thông tin khuyến mãi",
                });
            }
        } else {
            setCompleteTask(true);
            let resUploadProductImage = "";
            let resUploadProductImageVerify = [];
            let resUploadProductImageDesc = [];
            if (typeof values.productImage === "object") {
                let resUploadProductImage = "";
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
            if (typeof values.productImageVerify === "object") {
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
            if (typeof values.productImageDesc === "object") {
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

            const product = {
                SP_MaSP: productDetail.SP_MaSP,
                DV_MaDV: userUnit.DV_MaDV,
                LSP_MaLSP: userUnit.LDV_MaLDV,
                KM_MaKM: productDetail.KM_MaKM,
                DMSP_MaDMSP:
                    values.productCategory !== productDetail.DMSP_MaDMSP
                        ? values.productCategory
                        : false,
                SP_TenSanPham:
                    values.productName != productDetail.SP_TenSanPham
                        ? values.productName
                        : false,
                SP_SoLuongCungCau:
                    `${values.productAbility} ${values.productAbilityUnit}` !==
                    productDetail.SP_SoLuongCungCau
                        ? `${values.productAbility} ${values.productAbilityUnit}`
                        : false,
                SP_ChuKyCungCau:
                    `${values.productTimeApply} ${values.productTimeApplyUnit}` !==
                    productDetail.SP_ChuKyCungCau
                        ? `${values.productTimeApply} ${values.productTimeApplyUnit}`
                        : false,
                SP_AnhDaiDien: resUploadProductImage?.data?.path || false,
                SP_MoTa:
                    values.productDesc !== productDetail.SP_MoTa
                        ? values.productDesc
                        : false,
                SP_AnhMoTa:
                    resUploadProductImageDesc?.data?.paths.join(", ") || false,
                SP_MinhChung: resUploadProductImageVerify?.data?.paths.join(
                    ", "
                )
                    ? productDetail.SP_MinhChung
                        ? resUploadProductImageVerify?.data?.paths.join(", ") +
                          ", " +
                          productDetail.SP_MinhChung
                        : resUploadProductImageVerify?.data?.paths.join(", ")
                    : false,

                GSP_Gia:
                    values.productPrice != productDetail.GSP_Gia ||
                    values.productPriceUnit !== productDetail.GSP_DonViTinh
                        ? values.productPrice
                        : false,
                GSP_DonViTinh:
                    values.productPrice != productDetail.GSP_Gia ||
                    values.productPriceUnit !== productDetail.GSP_DonViTinh
                        ? values.productPriceUnit
                        : false,
                KM_PhanTram:
                    values.proPercent !== productDetail.KM_PhanTram
                        ? values.proPercent
                        : "",
                KM_NgayBatDau:
                    values.proStart?.split("-").reverse().join("/") !==
                    (productDetail.KM_NgayBatDau
                        ? productDetail.KM_NgayBatDau
                        : undefined)
                        ? values.proStart?.split("-").reverse().join("/")
                        : "",
                KM_NgayKetThuc:
                    values.proEnd?.split("-").reverse().join("/") !==
                    (productDetail.KM_NgayKetThuc
                        ? productDetail.KM_NgayKetThuc
                        : undefined)
                        ? values.proEnd?.split("-").reverse().join("/")
                        : "",
            };

            const response = await axios.put("/htx/update-product", product, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCompleteTask(false);
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    useEffect(() => {
        if (Object.keys(productDetail).length > 0) {
            setValue("productCategory", productDetail.DMSP_MaDMSP);
            setValue(
                "productAbilityUnit",
                productDetail.SP_SoLuongCungCau.split(" ")[1]
            );
            setValue(
                "productTimeApplyUnit",
                productDetail.SP_ChuKyCungCau.split(" ")[1]
            );
            setValue("productPriceUnit", productDetail.GSP_DonViTinh);
            if (productDetail.KM_MaKM) {
                let startDate = productDetail.KM_NgayBatDau.split("/");
                let newStartDate =
                    startDate[1] + "/" + startDate[0] + "/" + startDate[2];
                let endDate = productDetail.KM_NgayKetThuc.split("/");
                let newEndDate =
                    endDate[1] + "/" + endDate[0] + "/" + endDate[2];
                setValue(
                    "proStart",
                    new Date(newStartDate)
                        .toLocaleDateString("en-ZA")
                        .replaceAll("/", "-")
                );
                setValue(
                    "proEnd",
                    new Date(newEndDate)
                        .toLocaleDateString("en-ZA")
                        .replaceAll("/", "-")
                );
            }
        }
    }, [productDetail]);
    return (
        <form className="manage-product-add p-5 mt-5 box-shadow-custom rounded-xl relative">
            <div
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-secondary-color p-1 flex justify-center items-center cursor-pointer hover:bg-hover-secColor"
                onClick={() => handleCloseAdd()}
            >
                <i className="fa-solid fa-xmark text-white font-bold"></i>
            </div>
            <div className="form-name font-bold text-2xl text-center">
                {Object.keys(productDetail).length > 0
                    ? "Cập nhật thông tin sản phẩm"
                    : " Thêm sản phẩm mới"}
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
                    className="setting-unit-reset bg-secondary-color p-2 rounded-lg font-bold text-white min-w-[140px] hover:bg-hover-secColor"
                    onClick={(event) => {
                        event.preventDefault();
                        handleResetForm();
                    }}
                >
                    Đặt lại
                </button>
                {Object.keys(productDetail).length > 0 ? (
                    <div
                        className="setting-unit-update bg-primary-color rounded-lg p-2 font-bold text-white text-center min-w-[140px] hover:bg-hover-priColor flex justify-center cursor-pointer"
                        onClick={handleSubmit(handleEditProduct)}
                    >
                        {completeTask ? (
                            <div className="spinner"></div>
                        ) : (
                            "Cập nhật"
                        )}
                    </div>
                ) : (
                    <div
                        className="setting-unit-update bg-primary-color rounded-lg p-2 font-bold text-white text-center min-w-[140px] hover:bg-hover-priColor flex justify-center cursor-pointer"
                        onClick={handleSubmit(handleCreateProduct)}
                    >
                        {completeTask ? (
                            <div className="spinner"></div>
                        ) : (
                            "Thêm sản phẩm"
                        )}
                    </div>
                )}
            </div>
        </form>
    );
};

export default ProductCE;
