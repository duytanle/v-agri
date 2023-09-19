import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useClickOutSide from "../../Hook/useClickOutSide";
import { authLogOut } from "../../store/auth/auth-slice";
import ModalLogin from "../Portal/ModalLogin";
import ModalRegister from "../Portal/ModalRegister";
import ModalRemind from "../Portal/ModalRemind";
import HeaderEx from "./HeaderEx";
const Header = ({ children }) => {
    const [show, setShow, nodeRef] = useClickOutSide();

    const { user, userUnit } = useSelector((state) => state.auth);
    const { cart, intro } = useSelector((state) => state.dn);
    const { announce } = useSelector((state) => state.common);
    const [openModal, setOpenModal] = useState("");
    const [listIntro, setListIntro] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let listIntroTemp = [];
        intro.map((item, index) =>
            item.SPGT_DanhSach.map((item) => listIntroTemp.unshift(item))
        );
        setListIntro(listIntroTemp);
    }, [intro]);
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
                            QUẢN LÝ ĐƠN VỊ
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
                                number={cart.length}
                                title="Sản phẩm mới thêm"
                                footer={`Còn ${
                                    cart.length - 3 > 0 ? cart.length - 3 : 0
                                } sản phẩm trong giỏ hàng`}
                                button="Xem giỏ hàng"
                            >
                                {cart.length > 0 &&
                                    cart
                                        .slice(cart.length - 3)
                                        .reverse()
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    className="cart-item my-4 flex gap-3 cursor-pointer items-center"
                                                    key={item.SP_MaSP}
                                                >
                                                    <div className="img h-12 w-12 border-2 border-primary-color rounded-md overflow-hidden shrink-0">
                                                        <img
                                                            src={
                                                                item.SP_AnhDaiDien
                                                            }
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="iem-info flex-1">
                                                        <div className="item-name font-bold leading-4 ">
                                                            {item.SP_TenSanPham}
                                                        </div>
                                                        <div className="num-price flex justify-between text-[14px] mt-2">
                                                            <span className="number">
                                                                {
                                                                    item.SP_SoLuongCungCau
                                                                }
                                                                &nbsp;/&nbsp;tháng
                                                            </span>
                                                            <span className="price text-red-700">
                                                                {item.GSP_Gia.toString().replace(
                                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                    "$1."
                                                                )}
                                                                đ &nbsp;/&nbsp;
                                                                {
                                                                    item.GSP_DonViTinh
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                {cart.length === 0 && (
                                    <div className="empty w-full flex flex-col justify-center items-center gap-2">
                                        <img
                                            src="/images/empty-box.png"
                                            alt=""
                                            className="w-[150px]"
                                        />
                                        <p>
                                            Chưa có sản phẩm nào trong giỏ hàng
                                        </p>
                                    </div>
                                )}
                            </HeaderEx>
                            <HeaderEx
                                imgLink="/images/order.png"
                                imgDesc="bill"
                                number={listIntro.length}
                                title="Các lời chào hàng mới"
                                footer={`Còn ${
                                    listIntro.length - 3 > 0
                                        ? listIntro.length - 3
                                        : 0
                                } lời chào hàng nữa`}
                                button="Xem tất cả"
                            >
                                {listIntro.length > 0 &&
                                    listIntro.map((item, index) => (
                                        <div
                                            className="intro-item my-4 flex gap-3 cursor-pointer"
                                            onClick={() =>
                                                navigate(
                                                    `/chi_tiet_san_pham/${item.SP_MaSP}`
                                                )
                                            }
                                            key={item.SP_MaSP + index}
                                        >
                                            <div className="img h-12 w-12 border-2 border-primary-color rounded-md overflow-hidden shrink-0">
                                                <img
                                                    src={item.SP_AnhDaiDien}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="iem-info flex-1">
                                                <div className="item-name font-bold leading-4 ">
                                                    {item.SP_TenSanPham}
                                                </div>
                                                <div className="num-price flex justify-between text-[14px]">
                                                    <span className="number">
                                                        {item.SP_SoLuongCungCau}
                                                        &nbsp;/&nbsp;tháng
                                                    </span>
                                                    <span className="price text-red-700">
                                                        {item.GSP_Gia.toString().replace(
                                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                            "$1."
                                                        )}
                                                        đ &nbsp;/&nbsp;
                                                        {item.GSP_DonViTinh}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                {listIntro.length === 0 && (
                                    <div className="empty w-full flex flex-col justify-center items-center gap-2">
                                        <img
                                            src="/images/empty-folder.png"
                                            alt=""
                                            className="w-[150px]"
                                        />
                                        <p>Chưa có lời chào hàng nào</p>
                                    </div>
                                )}
                            </HeaderEx>
                        </>
                    ) : null}

                    <HeaderEx
                        imgLink="/images/bell.png"
                        imgDesc="bell"
                        number={announce?.length}
                        title="Các thông báo mới"
                        footer={`Còn ${
                            announce?.length > 3 ? announce?.length - 3 : 0
                        } thông báo nữa`}
                        button="Xem tất cả"
                    >
                        {announce?.length > 0 &&
                            announce?.map((item, index) => (
                                <div
                                    className="message-item my-4 cursor-pointer"
                                    key={index}
                                >
                                    <p className="item-title font-bold leading-4 ">
                                        {item?.TB_TieuDe}
                                    </p>
                                    <p className="short-content leading-5 text-sm ml-3 text-justify  text-2-line">
                                        {item?.TB_NoiDung}
                                    </p>
                                </div>
                            ))}
                        {announce?.length === 0 && (
                            <div className="empty w-full flex flex-col justify-center items-center gap-2">
                                <img
                                    src="/images/empty-bell.png"
                                    alt=""
                                    className="w-[150px]"
                                />
                                <p>Chưa có thông báo mới nào</p>
                            </div>
                        )}
                    </HeaderEx>
                    {/* <HeaderEx
                        imgLink="/images/chat.png"
                        imgDesc="chat icon"
                        number={3}
                        title="Các tin nhắn mới"
                        footer="Còn 5 tin nhắn nữa"
                        button="Xem tất cả"
                    ></HeaderEx> */}
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
                                src={
                                    user?.ND_AnhDaiDien ||
                                    userUnit?.DV_Logo ||
                                    "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                                }
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
