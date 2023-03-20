import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../CustomForm/Input.jsx";
import Dropdown from "../CustomForm/Dropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
const ProductFormOrder = ({ edit = false, dataEdit }) => {
    const { productDetail } = useSelector((state) => state.product);
    const { userUnit, accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const unitData = productDetail?.SP_SoLuongCungCau?.split(" ")[1];

    let dropdownUnitData = [
        { name: "Chọn đơn vị", value: "default" },
        ...(edit
            ? dataEdit.SP_SoLuongCungCau !== dataEdit.GSP_DonViTinh
                ? [
                      {
                          name: dataEdit.SP_SoLuongCungCau,
                          value: dataEdit.SP_SoLuongCungCau,
                      },
                      {
                          name: dataEdit.GSP_DonViTinh,
                          value: dataEdit.GSP_DonViTinh,
                      },
                  ]
                : [
                      {
                          name: dataEdit.GSP_DonViTinh,
                          value: dataEdit.GSP_DonViTinh,
                      },
                  ]
            : productDetail.GSP_DonViTinh !== unitData
            ? [
                  {
                      name: productDetail.GSP_DonViTinh,
                      value: productDetail.GSP_DonViTinh,
                  },
                  { name: unitData, value: unitData },
              ]
            : [{ name: unitData, value: unitData }]),
    ];
    const dropdownTimeData = [
        { name: "Chọn thời hạn", value: "default" },
        { name: "ngày", value: "ngày" },
        { name: "tháng", value: "tháng" },
        { name: "năm", value: "năm" },
    ];
    const validation = yup.object({
        productAmount: yup.number().typeError("Vui lòng nhập số"),
        productUnit: yup
            .string()
            .oneOf(
                ["kg", "tấn", "bó", "cây", "quả", "lít", "mét khối", "con"],
                "Vui lòng chọn đơn vị tính"
            ),
        orderTime: yup
            .number()
            .typeError("Vui lòng nhập số")
            .required("Vui lòng nhập thời hạn đơn hàng"),
        orderTimeUnit: yup
            .string()
            .oneOf(["ngày", "tháng", "năm"], "Vui lòng chọn thời hạn"),
        orderCycle: yup
            .number()
            .typeError("Vui lòng nhập số")
            .required("Vui lòng nhập chu kỳ nhận hàng"),
        orderCycleUnit: yup
            .string()
            .oneOf(["ngày", "tháng", "năm"], "Vui lòng chọn thời hạn"),
    });
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validation),
        defaultValues: {
            productAmount: dataEdit?.GH_SoLuong?.split(" ")[0] || "",
            productUnit: dataEdit?.GH_SoLuong?.split(" ")[1] || "",
            orderTime: dataEdit?.GH_ThoiHan?.split(" ")[0] || "",
            orderTimeUnit: dataEdit?.GH_ThoiHan?.split(" ")[1] || "",
            orderCycle: dataEdit?.GH_ChuKyNhan?.split(" ")[0] || "",
            orderCycleUnit: dataEdit?.GH_ChuKyNhan?.split(" ")[1] || "",
            startReceive: dataEdit?.GH_NgayNhan || "",
        },
    });

    const minStartDate = new Date()
        .toLocaleDateString("en-ZA")
        .replaceAll("/", "-");

    const saveToCart = (values) => {
        const data = {
            SP_MaSP: productDetail.SP_MaSP,
            DN_MaQL: userUnit.DN_MaQL,
            GH_SoLuong: `${values.productAmount} ${values.productUnit}`,
            GH_ThoiHan: `${values.orderTime} ${values.orderTimeUnit}`,
            GH_NgayNhan: values.startReceive,
            GH_ChuKyNhan: `${values.orderCycle} ${values.orderCycleUnit}`,
        };
        dispatch({
            type: "ADD_TO_CART",
            payload: { token: accessToken, data },
        });
    };
    const updateCartItem = (values) => {
        const data = {
            SP_MaSP: dataEdit.SP_MaSP,
            DN_MaQL: userUnit.DN_MaQL,
            GH_SoLuong: `${values.productAmount} ${values.productUnit}`,
            GH_ThoiHan: `${values.orderTime} ${values.orderTimeUnit}`,
            GH_NgayNhan: values.startReceive,
            GH_ChuKyNhan: `${values.orderCycle} ${values.orderCycleUnit}`,
        };
        dispatch({
            type: "UPDATE_CART_ITEM",
            payload: { token: accessToken, data },
        });
    };
    const orderProduct = (values) => {
        console.log(values);
    };

    return (
        <form
            className={`flex flex-col ${
                Object.keys(errors).length > 0 ? "gap-3" : "gap-8"
            }`}
        >
            <div className="form-order-productAmount grid grid-cols-12 items-center">
                <label
                    htmlFor="productAmount"
                    className="cursor-pointer flex-1 font-bold col-span-4"
                >
                    Số lượng cần đặt:
                </label>

                <Input
                    control={control}
                    id="productAmount"
                    name="productAmount"
                    customClass="w-[100px] px-2 py-1 border-2 border-primary-color rounded-lg col-span-4 ml-5"
                ></Input>

                <Dropdown
                    control={control}
                    setValue={setValue}
                    labelDefault="Đơn vị tính"
                    name="productUnit"
                    id="productUnit"
                    dropdownData={dropdownUnitData}
                    customClass="w-[120px] col-span-4"
                    customTitle="px-2 py-1"
                    defaultValue={
                        dataEdit?.GH_SoLuong?.split(" ")[1] || "default"
                    }
                ></Dropdown>

                {errors.productAmount || errors.productUnit ? (
                    <>
                        <p className="col-span-4"></p>
                        <p className="text-secondary-color text-sm  mt-1 col-span-8 ml-5">
                            {errors?.productAmount?.message ||
                                errors?.productUnit?.message}
                        </p>
                    </>
                ) : null}
            </div>

            <div className="form-order-time grid grid-cols-12">
                <label
                    htmlFor="orderTime"
                    className="cursor-pointer flex-1 font-bold col-span-4"
                >
                    Thời hạn đơn hàng:
                </label>

                <Input
                    type="text"
                    control={control}
                    id="orderTime"
                    name="orderTime"
                    customClass="w-[100px] px-2 py-1 mx-3 border-2 border-primary-color rounded-lg col-span-4 ml-5"
                ></Input>

                <Dropdown
                    control={control}
                    setValue={setValue}
                    labelDefault="Thời hạn"
                    id="orderTimeUnit"
                    name="orderTimeUnit"
                    dropdownData={dropdownTimeData}
                    customClass="w-[120px] col-span-4"
                    customTitle="px-2 py-1"
                    defaultValue={
                        dataEdit?.GH_ThoiHan?.split(" ")[1] || "default"
                    }
                ></Dropdown>

                {errors.orderTime || errors.orderTimeUnit ? (
                    <>
                        <p className="col-span-4"></p>
                        <p className="text-secondary-color text-sm  mt-1 col-span-8 ml-5">
                            {errors?.orderTime?.message ||
                                errors?.orderTimeUnit?.message}
                        </p>
                    </>
                ) : null}
            </div>
            <div className="form-order-cycle grid grid-cols-12 items-center ">
                <label
                    htmlFor="orderCycle"
                    className="cursor-pointer flex-1 font-bold col-span-4"
                >
                    Chu kỳ nhận hàng:
                </label>

                <Input
                    type="text"
                    control={control}
                    id="orderCycle"
                    name="orderCycle"
                    customClass="w-[100px] px-2 py-1 mx-3 border-2 border-primary-color rounded-lg col-span-4 ml-5"
                ></Input>

                <Dropdown
                    control={control}
                    setValue={setValue}
                    labelDefault="Chu kỳ"
                    name="orderCycleUnit"
                    dropdownData={dropdownTimeData}
                    customClass="w-[120px] col-span-4"
                    customTitle="px-2 py-1"
                    defaultValue={
                        dataEdit?.GH_ChuKyNhan?.split(" ")[1] || "default"
                    }
                ></Dropdown>

                {errors.orderCycle || errors.orderCycleUnit ? (
                    <>
                        <p className="col-span-4"></p>
                        <p className="text-secondary-color text-sm mt-1 col-span-8 ml-5">
                            {errors?.orderCycle?.message ||
                                errors?.orderCycleUnit?.message}
                        </p>
                    </>
                ) : null}
            </div>
            <div className="form-start-receive grid grid-cols-12 items-center">
                <label
                    htmlFor="startReceive"
                    className="col-span-6 cursor-pointer font-bold"
                >
                    Ngày bắt đầu nhận hàng:
                </label>
                <Input
                    type="date"
                    control={control}
                    id="startReceive"
                    name="startReceive"
                    customClass="col-span-6 px-2 py-1 border-2 border-primary-color rounded-lg mx-[30px]"
                    min={minStartDate}
                ></Input>
            </div>
            <div className="flex gap-5 items-center justify-center mt-4">
                {edit ? (
                    <button
                        type="submit"
                        onClick={handleSubmit(updateCartItem)}
                        className="p-2 text-white font-bold outline-none bg-primary-color rounded-lg  hover:bg-hover-priColor "
                    >
                        Lưu thay đổi
                    </button>
                ) : (
                    <>
                        <button
                            type="submit"
                            onClick={handleSubmit(orderProduct)}
                            className="p-2 text-white font-bold outline-none bg-secondary-color rounded-lg min-w-[170px] hover:bg-hover-secColor "
                        >
                            Đặt hàng
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit(saveToCart)}
                            className="p-2 text-white font-bold outline-none bg-primary-color rounded-lg  hover:bg-hover-priColor "
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default ProductFormOrder;
