import React from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "../CustomForm/Input";
import { useDispatch } from "react-redux";
import { authLogin } from "../../store/auth/auth-slice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const ModalLogin = ({ openModal, setOpenModal }) => {
    const validationSchema = yup.object({
        username: yup.string().required("Vui lòng nhập tên đăng nhập"),
        password: yup
            .string()
            // .min(8, "Mật khẩu tối thiểu 8 ký tự")
            .required("Vui lòng nhập mật khẩu"),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();
    const handleLogin = (values) => {
        try {
            dispatch(authLogin(values));
        } catch (error) {}
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
                        Đăng nhập
                    </div>
                    <div className="form-content w-[80%] [&>*]:my-5">
                        <div className="account flex flex-col gap-3">
                            <label htmlFor="username" className="font-bold">
                                Tên đăng nhập:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="username"
                                id="username"
                                customClass="py-2 px-3 border-primary-color border-2 rounded-md "
                            ></Input>
                            {errors?.username ? (
                                <p className="text-sm text-secondary-color">
                                    {errors.username.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="password flex flex-col gap-3">
                            <label htmlFor="password" className="font-bold">
                                Mật khẩu:{" "}
                            </label>
                            <Input
                                type="password"
                                control={control}
                                name="password"
                                id="password"
                                customClass="py-2 px-3 border-primary-color border-2 rounded-md "
                            ></Input>
                            {errors?.password ? (
                                <p className="text-sm text-secondary-color">
                                    {errors.password.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="forget-pw text-primary-color font-bold cursor-pointer">
                            Quên mật khẩu?
                        </div>
                        <div
                            className="button-submit w-full"
                            onClick={handleSubmit(handleLogin)}
                        >
                            <button className="form-submit w-full p-2 bg-primary-color font-bold text-white rounded-md hover:bg-hover-priColor">
                                Đăng nhập
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

export default ModalLogin;
