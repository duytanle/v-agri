import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmployeeAvatar from "../../UnitManage/Employees/EmployeeAvatar";
import Input from "../../CustomForm/Input";
import Dropdown from "../../CustomForm/Dropdown";

const AccountForm = ({ children, defaultValues = {}, textButtonSubmit }) => {
    const validationSchema = yup.object({
        fullName: yup.string(30).required("Vui lòng nhập họ tên"),
        username: yup.string(30).required("Vui lòng nhập tên tài khoản"),
        password: yup
            .string(10)
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu tối thiểu 8 ký tự")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                {
                    message:
                        "Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặt biệt",
                }
            ),
        position: yup
            .string()
            .required("Vui lòng chọn loại tài khoản")
            .oneOf(
                ["manage-post"],
                "Bạn chỉ có thể chọn vị trí Quản lý bài đăng"
            ),
    });
    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues:
            Object.keys(defaultValues).length > 0 ? defaultValues : {},
        resolver: yupResolver(validationSchema),
    });

    const handleAddEmp = (values) => {
        console.log(values);
    };
    const handleResetForm = (event) => {
        event.preventDefault();
        reset({
            empAvatar: "default",
            fullName: "",
            username: "",
            password: "",
            position: "default",
        });
        setResetForm(!resetForm);
    };
    return (
        <div className="employee-add animate__animated animate__fadeIn h-[90%] w-[90%] bg-white mt-5 mx-auto rounded-3xl box-shadow-custom relative">
            <div className="add-title text-center font-bold text-2xl p-5">
                Thêm tài khoản
            </div>
            <div className="add-form h-[80%]  w-[70%] mx-auto">
                <form className="grid grid-cols-7 gap-10 h-full">
                    <EmployeeAvatar
                        control={control}
                        customClass="col-span-3  h-[300px] my-auto p-4 w-full bg-white flex-shrink-0"
                        setValue={setValue}
                        name="empAvatar"
                        id="empAvatar"
                        defaultAvatar="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                    ></EmployeeAvatar>
                    <div
                        className={`emp-basic col-span-4 my-auto ${
                            Object.keys(errors).length > 0
                                ? "[&>*]:mb-3"
                                : "[&>*]:mb-5"
                        }`}
                    >
                        <div className="emp-name  items-center grid grid-cols-8">
                            <label htmlFor="fullName" className="col-span-3">
                                Tên nhân viên:
                            </label>
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                control={control}
                                customClass="col-span-5 border-2 border-primary-color flex-1 p-2 rounded-lg"
                            ></Input>
                            {errors.fullName ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="col-span-5 text-sm text-red-700">
                                        {errors.fullName.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="emp-account  items-center grid grid-cols-8">
                            <label htmlFor="username" className="col-span-3">
                                Tên đăng nhập:
                            </label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                control={control}
                                customClass="col-span-5 border-2 border-primary-color flex-1 p-2 rounded-lg"
                            ></Input>
                            {errors.username ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="col-span-5 text-sm text-red-700">
                                        {errors.username.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="emp-password  items-center grid grid-cols-8">
                            <label htmlFor="password" className="col-span-3">
                                Mật khẩu:
                            </label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                control={control}
                                customClass="border-2 border-primary-color flex-1 p-2 col-span-5 rounded-lg"
                            ></Input>
                            {errors.password ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="col-span-5 text-sm text-red-700">
                                        {errors.password.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="emp-position  items-center grid grid-cols-8">
                            <label htmlFor="position" className="col-span-3">
                                Loại tài khoản:
                            </label>
                            <Dropdown
                                control={control}
                                labelDefault="Loại tài khoản"
                                setValue={setValue}
                                name="position"
                                dropdownData={[
                                    {
                                        name: "Chọn loại",
                                        value: "default",
                                    },
                                    {
                                        name: "Quản lý bài đăng",
                                        value: "manage-post",
                                    },
                                ]}
                                customClass="col-span-5"
                                customTitle="p-2"
                            ></Dropdown>
                            {errors.position ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="col-span-5 text-sm text-red-700">
                                        {errors.position.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="button grid grid-cols-8 mt-[50px]">
                            <div className="col-span-3"></div>
                            <div className="col-span-5 flex justify-between">
                                <button
                                    className="outline-none p-2 font-bold text-white bg-secondary-color rounded-lg min-w-[100px]"
                                    onClick={handleResetForm}
                                >
                                    Đặt Lại
                                </button>
                                <button
                                    className="outline-none p-2 font-bold text-white bg-primary-color rounded-lg min-w-[100px]"
                                    onClick={handleSubmit(handleAddEmp)}
                                >
                                    {textButtonSubmit}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {children}
        </div>
    );
};

export default AccountForm;
