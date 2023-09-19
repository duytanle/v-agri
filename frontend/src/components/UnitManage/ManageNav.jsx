import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogOut } from "../../store/auth/auth-slice";
import ModalRemind from "../Portal/ModalRemind";
const ManageNav = ({ nav }) => {
    const { userUnit, user } = useSelector((state) => state.auth);

    return (
        <>
            <div className="manage-nav__info flex flex-col justify-center items-center gap-1">
                <div className="unit-logo h-[80px] w-[80px] relative p-2 ">
                    <img
                        src={
                            userUnit?.DV_Logo ||
                            user?.ND_AnhDaiDien ||
                            "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                        }
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <div className="unit-name text-lg font-bold text-center">
                    {userUnit?.DV_TenDonVi || user?.ND_HoTen}
                </div>
            </div>
            <div className="manage-nav__list mx-2 mt-5">
                {nav.length > 0
                    ? nav.map((item) => (
                          <div
                              className="nav-item flex gap-4 items-center text-[18px]  my-2 px-2 py-2 cursor-pointer"
                              key={item.id}
                          >
                              <i className={`${item.icon} w-[30px]`}></i>
                              <NavLink to={item.link}>{item.name}</NavLink>
                          </div>
                      ))
                    : null}
                {/* <div
                    className="nav-item flex gap-4 items-center text-[18px]  px-5 py-2 cursor-pointer"
                    onClick={() => setOpenModal(true)}
                >
                    <i className="fa-solid fa-right-from-bracket w-[30px]"></i>
                    <span>Đăng xuất</span>
                </div>
                <ModalRemind
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    onLogout={() => {
                        try {
                            dispatch(authLogOut());
                            navigate("/");
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                ></ModalRemind> */}
            </div>
        </>
    );
};

export default ManageNav;
