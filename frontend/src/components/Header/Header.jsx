import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useClickOutSide from "../../Hook/useClickOutSide";
import { authLogOut } from "../../store/auth/auth-slice";
import ModalLogin from "../Portal/ModalLogin";
import ModalRegister from "../Portal/ModalRegister";
import ModalRemind from "../Portal/ModalRemind";
import HeaderEx from "./HeaderEx";
const Header = ({ children }) => {
    const [openModal, setOpenModal] = useState("");
    const [show, setShow, nodeRef] = useClickOutSide();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="header fixed z-50 h-[80px] w-full bg-white flex items-center px-8">
            <div className="header-logo h-full">
                <img
                    src="/images/row-logo.png"
                    alt="Logo"
                    className="h-full max-h-16"
                />
            </div>
            <nav className="header-nav flex-1 justify-center grid grid-flow-col auto-cols-max gap-9 ">
                <NavLink to="/" className="text-lg font-bold">
                    TRANG CHỦ
                </NavLink>

                {user ? (
                    user.LND_MaLND === "DN" || user.LND_MaLND === "HTX" ? (
                        <NavLink to="/quan_ly" className="text-lg font-bold">
                            QUẢN LÝ CỬA HÀNG
                        </NavLink>
                    ) : null
                ) : null}
            </nav>
            {user && (user.LND_MaLND === "HTX" || user.LND_MaLND === "DN") ? (
                <div className="header-extensions h-full grid grid-flow-col auto-cols-max gap-9 justify-center items-center">
                    {user.LND_MaLND === "DN" ? (
                        <>
                            <HeaderEx
                                imgLink="/images/cart.png"
                                imgDesc="shopping icon"
                                number={3}
                                title="Sản phẩm mới thêm"
                                footer="Còn 8 sản phẩm trong giỏ hàng"
                                button="Xem giỏ hàng"
                            >
                                <div className="cart-item my-4 flex gap-3 cursor-pointer">
                                    <div className="img h-12 w-12 border-2 border-primary-color rounded-md overflow-hidden shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="iem-info">
                                        <div className="item-name font-bold leading-4 ">
                                            Khóm cầu đúc sản xuất tại Cầu Đúc ăn
                                            ngon bá cháy
                                        </div>
                                        <div className="num-price flex justify-between text-[14px]">
                                            <span className="number">
                                                150 kg / tháng
                                            </span>
                                            <span className="price text-red-700">
                                                150.000đ / kg
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="empty w-full flex flex-col justify-center items-center gap-2">
                        <img
                            src="/images/empty-box.png"
                            alt=""
                            className="w-[150px]"
                        />
                        <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                    </div> */}
                            </HeaderEx>
                            <HeaderEx
                                imgLink="/images/order.png"
                                imgDesc="bill"
                                number={3}
                                title="Các lời chào hàng mới"
                                footer="Còn 5 lời chào hàng nữa"
                                button="Xem tất cả"
                            >
                                <div className="intro-item my-4 flex gap-3 cursor-pointer">
                                    <div className="img h-12 w-12 border-2 border-primary-color rounded-md overflow-hidden shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="iem-info">
                                        <div className="item-name font-bold leading-4 ">
                                            Khóm cầu đúc sản xuất tại Cầu Đúc ăn
                                            ngon bá cháy
                                        </div>
                                        <div className="num-price flex justify-between text-[14px]">
                                            <span className="number">
                                                150 kg / tháng
                                            </span>
                                            <span className="price text-red-700">
                                                150.000đ / kg
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="empty w-full flex flex-col justify-center items-center gap-2">
                        <img
                            src="/images/empty-folder.png"
                            alt=""
                            className="w-[150px]"
                        />
                        <p>Chưa có lời chào hàng nào</p>
                    </div> */}
                            </HeaderEx>
                        </>
                    ) : null}

                    <HeaderEx
                        imgLink="/images/bell.png"
                        imgDesc="bell"
                        number={3}
                        title="Các thông báo mới"
                        footer="Còn 5 thông báo nữa"
                        button="Xem tất cả"
                    >
                        <div className="message-item my-4 cursor-pointer">
                            <p className="item-title font-bold leading-4 ">
                                Chiều nay trúng sổ xổ mai nghỉ học
                            </p>
                            <p className="short-content leading-5 text-sm ml-3 text-justify  text-2-line">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatum aperiam dolorum
                                omnis odit totam rerum id animi culpa vel. Magni
                                fugit voluptates aut consectetur enim recusandae
                                deleniti consequuntur obcaecati quod!
                            </p>
                        </div>
                        {/* <div className="empty w-full flex flex-col justify-center items-center gap-2">
                        <img
                            src="/images/empty-bell.png"
                            alt=""
                            className="w-[150px]"
                        />
                        <p>Chưa có thông báo mới nào</p>
                    </div> */}
                    </HeaderEx>
                    <HeaderEx
                        imgLink="/images/chat.png"
                        imgDesc="chat icon"
                        number={3}
                        title="Các tin nhắn mới"
                        footer="Còn 5 tin nhắn nữa"
                        button="Xem tất cả"
                    ></HeaderEx>
                </div>
            ) : null}
            <div className="header-profile ml-9 cursor-pointer flex gap-5">
                {user ? (
                    <div
                        className="h-[40px] w-[40px] border-4 border-primary-color rounded-full relative"
                        ref={nodeRef}
                    >
                        <div
                            className="w-full h-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShow(!show);
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1676439977206-b5ffdfc03da2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                alt="logo"
                                className="h-full w-full object-cover rounded-full"
                            />
                            <div
                                className={`logout absolute top-[160%] -right-2 w-[150px] max-h bg-white rounded-lg box-shadow-custom text-center p-2 font-bold text-lg border-secondary-color border-2  ${
                                    show
                                        ? "animate__animated animate__fadeIn"
                                        : "hidden"
                                }`}
                                onClick={() => setOpenModal("logout")}
                            >
                                <i className="fa-solid fa-right-from-bracket mr-5"></i>
                                <span>Đăng xuất</span>
                                <div
                                    className={`absolute -top-[36px] right-2 border-[18px]  border-secondary-color border-t-transparent border-l-transparent border-r-transparent cursor-pointer `}
                                ></div>
                            </div>
                            <ModalRemind
                                openModal={openModal === "logout"}
                                setOpenModal={setOpenModal}
                                onLogout={() => {
                                    try {
                                        dispatch(authLogOut());
                                        navigate("/");
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            ></ModalRemind>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="login border-r-2 pr-5 border-primary-color">
                            <div onClick={() => setOpenModal("login")}>
                                Đăng nhập
                            </div>
                            <ModalLogin
                                openModal={openModal === "login"}
                                setOpenModal={setOpenModal}
                            ></ModalLogin>
                        </div>
                        <div className="signup ">
                            <div onClick={() => setOpenModal("register")}>
                                Đăng ký
                            </div>
                            <ModalRegister
                                openModal={openModal === "register"}
                                setOpenModal={setOpenModal}
                            ></ModalRegister>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
