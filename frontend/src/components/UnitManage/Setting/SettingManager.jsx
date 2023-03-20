import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../CustomForm/Input";
import EmployeeAvatar from "../Employees/EmployeeAvatar";

const SettingManager = () => {
    const [resetPassword, setResetPassword] = useState(false);
    const validateResetPW = resetPassword
        ? {
              managerResetPW: yup
                  .string()
                  .required("Vui lòng nhập mật khẩu mới"),
              managerRetypePW: yup
                  .string()
                  .required("Vui lòng nhập lại mật khẩu mới"),
          }
        : {};
    const validationSchema = yup.object({
        managerName: yup.string(50).required("Vui lòng nhập tên quản lý"),
        managerEmail: yup
            .string(30)
            .email("Email chưa đúng định dạng")
            .required("Vui lòng nhập email"),
        managerPhone: yup
            .string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Số điện thoại không hợp lệ"
            )
            .min(10, "Tối thiểu 10 số")
            .max(12, "Tối đa 12 chữ số")
            .required("Vui lòng nhập số điện thoại"),
        ...validateResetPW,
    });
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
        register,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            managerName: "Lê Duy Tân",
            managerEmail: "kynhuctahg@gmail.com",
            managerPhone: "0939383736",
        },
    });
    const handleResetForm = (event) => {
        event.preventDefault();
        reset({
            managerAvatar: "default",
            managerName: "Lê Duy Tân",
            managerEmail: "kynhuctahg@gmail.com",
            managerPhone: "0939383736",
        });
    };
    const handleUpdate = (values) => {
        console.log(values);
    };
    return (
        <form className="setting-unit h-full  px-5 py-3">
            <div className="setting-manager-name text-center flex justify-between ">
                <div className="manger-id bg-primary-color rounded-lg flex items-center px-3 font-bold text-white text-3xl max-h-[55px]">
                    kynhuctahg
                </div>

                <div className="manager-name flex-1">
                    <Input
                        control={control}
                        name="managerName"
                        id="managerName"
                        placeholder="Nhập họ và tên"
                        customClass={
                            "border-b-2 border-b-primary-color p-2 font-bold text-3xl w-[90%] text-center"
                        }
                    ></Input>
                    {errors.managerName ? (
                        <p className="text-red-700 text-sm">
                            {errors.managerName.message}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="info-card h-[80%] flex justify-evenly items-center">
                <EmployeeAvatar
                    control={control}
                    setValue={setValue}
                    name="managerAvatar"
                    id="managerAvatar"
                    customClass={`unit-logo col-span-3 h-[300px]  p-4 w-[300px]  ${
                        Object.keys(errors).length > 0 ? "mt-5" : "my-auto"
                    }`}
                    defaultAvatar="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                ></EmployeeAvatar>
                <div
                    className={`card col-span-8 h-full max-w-[500px] flex items-center `}
                >
                    <div
                        className={`w-full ${
                            Object.keys(errors).length > 0
                                ? "[&>*]:my-5"
                                : "[&>*]:my-6"
                        } -mt-10`}
                    >
                        <div className="setting-manager-password text-lg my-2 grid grid-cols-9 gap-x-2 gap-y-1 w-full items-center last:my-0">
                            <div className="font-bold col-span-3 ">
                                Mật khẩu:
                            </div>
                            <div className="col-span-3 ">B1906758</div>
                            <div
                                className={`col-span-3  font-bold cursor-pointer  py-1 px-2 rounded-lg ${
                                    resetPassword
                                        ? "text-white bg-primary-color"
                                        : "bg-gray-200 text-black"
                                }`}
                                onClick={() => setResetPassword(!resetPassword)}
                            >
                                Đặt lại mật khẩu
                            </div>
                        </div>
                        {resetPassword ? (
                            <>
                                <div className="setting-manager-resetPW text-lg my-2 grid grid-cols-9 gap-x-2 gap-y-1 w-full last:my-0">
                                    <label
                                        htmlFor="managerResetPW"
                                        className="font-bold col-span-3"
                                    >
                                        Mật khẩu mới:
                                    </label>
                                    <Input
                                        type="password"
                                        control={control}
                                        name="managerResetPW"
                                        id="managerResetPW"
                                        placeholder="Nhập mật khẩu mới"
                                        customClass="border-b-2 border-primary-color  col-span-6"
                                    ></Input>
                                    {errors.managerResetPW ? (
                                        <>
                                            <p className="col-span-3"></p>
                                            <p className="text-red-700 text-sm col-span-6">
                                                {errors.managerResetPW.message}
                                            </p>
                                        </>
                                    ) : null}
                                </div>
                                <div className="setting-manager-retypePW text-lg my-2 grid grid-cols-9 gap-x-2 gap-y-1 w-full last:my-0">
                                    <label
                                        htmlFor="managerRetypePW"
                                        className="font-bold col-span-3"
                                    >
                                        Nhập lại mật khẩu:
                                    </label>
                                    <Input
                                        type="password"
                                        control={control}
                                        name="managerRetypePW"
                                        id="managerRetypePW"
                                        placeholder="Nhập lại mật khẩu mới"
                                        customClass="border-b-2 border-primary-color  col-span-6"
                                    ></Input>
                                    {errors.managerRetypePW ? (
                                        <>
                                            <p className="col-span-3"></p>
                                            <p className="text-red-700 text-sm col-span-6">
                                                {errors.managerRetypePW.message}
                                            </p>
                                        </>
                                    ) : null}
                                </div>
                            </>
                        ) : null}
                        <div className="setting-manager-phone text-lg my-2 grid grid-cols-9 gap-x-2 gap-y-1 w-full last:my-0">
                            <label
                                htmlFor="managerPhone"
                                className="font-bold  col-span-3"
                            >
                                Số điện thoại:
                            </label>
                            <Input
                                control={control}
                                name="managerPhone"
                                id="managerPhone"
                                placeholder="Nhập số điện thoại"
                                customClass="border-b-2 border-primary-color  col-span-6"
                            ></Input>
                            {errors.managerPhone ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="text-red-700 text-sm col-span-6">
                                        {errors.managerPhone.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="setting-manager-email text-lg my-2 grid grid-cols-9 gap-x-2 gap-y-1 w-full last:my-0">
                            <label
                                htmlFor="managerEmail"
                                className="font-bold  col-span-3"
                            >
                                Email:
                            </label>
                            <Input
                                type="email"
                                control={control}
                                name="managerEmail"
                                id="managerEmail"
                                placeholder="Nhập địa chỉ email"
                                customClass="border-b-2 border-primary-color  col-span-6"
                            ></Input>
                            {errors.managerEmail ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="text-red-700 text-sm col-span-6">
                                        {errors.managerEmail.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`setting-unit-button w-full flex justify-center gap-12 ${
                    Object.keys(errors).length > 0 ? "-mt-5" : ""
                }`}
            >
                <button
                    className="setting-unit-reset bg-secondary-color p-2 rounded-lg font-bold text-white min-w-[120px]"
                    onClick={handleResetForm}
                >
                    Đặt lại
                </button>
                <button
                    className="setting-unit-update bg-primary-color rounded-lg font-bold text-white min-w-[120px]"
                    onClick={handleSubmit(handleUpdate)}
                >
                    Lưu thay đổi
                </button>
            </div>
        </form>
    );
};

export default SettingManager;
