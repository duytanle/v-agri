import React from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "../CustomForm/Input";
import Dropdown from "../CustomForm/Dropdown";
import { authRegister } from "../../store/auth/auth-slice";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const ModalRegister = ({ openModal, setOpenModal }) => {
    const validationSchema = yup.object({
        unitName: yup.string().required("Vui lòng nhập tên đơn vị"),
        unitType: yup
            .string()
            .oneOf(["HTX", "DN"], "Vui lòng chọn loại đơn vị"),
        unitAccount: yup.string().required("Vui lòng nhập tên đăng nhập"),
        unitPassword: yup
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
    });
    const {
        control,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();
    const handleRegister = (values) => {
        try {
            dispatch(authRegister(values));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal
            visible={openModal}
            bodyClassName="z-10 bg-white rounded-lg max-w-[900px] w-full h-[600px]"
            onClose={() => setOpenModal("")}
        >
            <div className=" relative login-bg w-full h-full bg-[url('/images/authenBG.png')] bg-cover rounded-lg">
                <form className="form-login absolute top-1/2 right-5 -translate-y-1/2 w-[350px] h-[350px] py-5 px-2  flex flex-col justify-center items-center">
                    <div className="text-primary-color  text-3xl font-bold text-center">
                        Đăng ký
                    </div>
                    <div
                        className={`form-content w-[80%] [&>*]:my-[13px] ${
                            Object.keys(errors).length > 0 ? "" : "[&>*]:my-7"
                        }`}
                    >
                        <div className="unit-name flex flex-col gap-1">
                            <label htmlFor="unitName" className="font-bold">
                                Tên đơn vị:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitName"
                                id="unitName"
                                customClass="py-2 px-3 border-primary-color border-2 rounded-md "
                            ></Input>
                            {errors?.unitName ? (
                                <p className="text-secondary-color text-sm">
                                    {errors.unitName.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="unit-type flex flex-col gap-1">
                            <label htmlFor="unitType" className="font-bold">
                                Loại đơn vị
                            </label>
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Loại đơn vị"
                                dropdownData={[
                                    { name: "Hợp tác xã", value: "HTX" },
                                    { name: "Doanh nghiệp", value: "DN" },
                                ]}
                                name="unitType"
                                id="unitType"
                                customTitle="p-2"
                            ></Dropdown>
                            {errors?.unitType ? (
                                <p className="text-secondary-color text-sm">
                                    {errors.unitType.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="account flex flex-col gap-1">
                            <label htmlFor="unitAccount " className="font-bold">
                                Tên đăng nhập:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="unitAccount"
                                id="unitAccount"
                                customClass="py-2 px-3 border-primary-color border-2 rounded-md "
                            ></Input>
                            {errors?.unitAccount ? (
                                <p className="text-secondary-color text-sm">
                                    {errors.unitAccount.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="password flex flex-col gap-1">
                            <label htmlFor="unitPassword" className="font-bold">
                                Mật khẩu:
                            </label>
                            <Input
                                type="password"
                                control={control}
                                name="unitPassword"
                                id="unitPassword"
                                customClass="py-2 px-3 border-primary-color border-2 rounded-md "
                            ></Input>
                            {errors?.unitPassword ? (
                                <p className="text-secondary-color text-sm">
                                    {errors.unitPassword.message}
                                </p>
                            ) : null}
                        </div>

                        <div
                            className={`button-submit w-full ${
                                errors ? "" : "mt-4"
                            }`}
                            onClick={handleSubmit(handleRegister)}
                        >
                            <button className="form-submit w-full p-2 bg-primary-color font-bold text-white rounded-md hover:bg-hover-priColor">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </form>
                <div
                    className="absolute w-10 h-10 top-1 right-1 flex justify-center items-center rounded-full bg-secondary-color font-bold text-xl text-white cursor-pointer"
                    onClick={() => setOpenModal("")}
                >
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </Modal>
    );
};

export default ModalRegister;
