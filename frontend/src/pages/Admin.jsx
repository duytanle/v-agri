import React from "react";
import { Outlet } from "react-router-dom";
import ManageNav from "../components/UnitManage/ManageNav";
const Admin = () => {
    const nav = [
        {
            id: 1,
            icon: "fa-solid fa-chart-simple",
            link: "/",
            name: "Tổng quan",
        },
        {
            id: 2,
            icon: "fa-solid fa-user",
            link: "/tai_khoan",
            name: "Tài khoản",
        },
        {
            id: 3,
            icon: "fa-solid fa-check-to-slot",
            link: "/xac_minh",
            name: "Xác minh",
        },

        {
            id: 4,
            icon: "fa-solid fa-bell",
            link: "/thong_bao",
            name: "Thông báo",
        },
    ];
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

export default Admin;
