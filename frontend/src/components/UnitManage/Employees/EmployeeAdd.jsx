import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EmployeeCE from "./EmployeeCE";
const EmployeeAdd = ({ children, defaultValues = {} }) => {
    const [resetForm, setResetForm] = useState(false);
    const validationSchema = yup.object({
        empId: yup.string(10).required("Vui lòng nhập mã nhân viên"),
        empName: yup.string(30).required("Vui lòng nhập tên nhân viên"),
        empAccount: yup.string(30).required("Vui lòng nhập tên tài khoản"),
        empPassword: yup
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
        empPosition: yup
            .string()
            .required("Vui lòng chọn vị trí làm việc")
            .oneOf(
                ["manage-product", "manage-order"],
                "Bạn chỉ có thể chọn vị trí Quản lý sản phẩm hoặc Quản lý đơn hàng"
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
            empId: "",
            empName: "",
            empAccount: "",
            empPassword: "",
            empPosition: "default",
        });
        setResetForm(!resetForm);
    };
    return (
        <div className="employee-add animate__animated animate__fadeIn h-[90%] w-[90%] bg-white mt-5 mx-auto rounded-3xl box-shadow-custom relative">
            <div className="add-title text-center font-bold text-2xl p-5">
                Thêm tài khoản nhân viên
            </div>
            <div className="add-form h-[80%]  w-[70%] mx-auto">
                <EmployeeCE
                    control={control}
                    setValue={setValue}
                    errors={errors}
                >
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
                        Thêm
                    </button>
                </EmployeeCE>
            </div>
            {children}
        </div>
    );
};

export default EmployeeAdd;
