import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ManageNav from "../components/UnitManage/ManageNav";
import "../components/UnitManage/UnitManage.css";
const UnitManage = () => {
    const { user, accessToken, userUnit } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const checkUser =
        user.LND_MaLND === "DN"
            ? [
                  {
                      id: 4,
                      icon: "fa-solid fa-cart-shopping",
                      link: "/quan_ly/gio_hang",
                      name: "Giỏ hàng",
                  },
              ]
            : [];
    const nav = [
        {
            id: 1,
            icon: "fa-solid fa-chart-simple",
            link: "/quan_ly",
            name: "Tổng quan",
        },
        {
            id: 2,
            icon: "fa-solid fa-boxes-stacked",
            link: "/quan_ly/san_pham",
            name: "Sản phẩm",
        },
        {
            id: 3,
            icon: "fa-solid fa-file-invoice",
            link: "/quan_ly/don_hang",
            name: "Đơn hàng",
        },
        ...checkUser,
        {
            id: 5,
            icon: "fa-solid fa-box",
            link: "/quan_ly/chao_hang",
            name: "Chào hàng",
        },
        {
            id: 6,
            icon: "fa-solid fa-comments",
            link: "/quan_ly/tin_nhan",
            name: "Tin nhắn",
        },
        {
            id: 7,
            icon: "fa-solid fa-bell",
            link: "/quan_ly/thong_bao",
            name: "Thông báo",
        },
        {
            id: 8,
            icon: "fa-solid fa-triangle-exclamation",
            link: "/quan_ly/canh_bao",
            name: "Cảnh báo",
        },
        {
            id: 9,
            icon: "fa-solid fa-clipboard-user",
            link: "/quan_ly/nhan_vien",
            name: "Nhân viên",
        },
        {
            id: 10,
            icon: "fa-solid fa-gear",
            link: "/quan_ly/cai_dat",
            name: "Cài đặt",
        },
    ];
    useEffect(() => {
        if (user.LND_MaLND === "DN") {
            dispatch({ type: "GET_CART", payload: accessToken });
            dispatch({
                type: "DN_GET_INTRO",
                payload: {
                    token: accessToken,
                    DV_MaDV: userUnit.DV_MaDV,
                    ND_MaND: user.ND_MaND,
                },
            });
        }
    }, []);
    return (
        <div className="unit-manage pt-[85px] h-[730px] px-8 grid grid-cols-6 gap-5 ">
            <div className="manage-nav col-span-1 px-2 py-2 rounded-2xl box-shadow-custom h-[655px]">
                <ManageNav nav={nav}></ManageNav>
            </div>
            <div className="manage-content col-span-5 rounded-2xl box-shadow-custom h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default UnitManage;
