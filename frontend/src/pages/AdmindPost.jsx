import React from "react";
import { Outlet } from "react-router-dom";
import ManageNav from "../components/UnitManage/ManageNav";
const AdminPost = () => {
    const nav = [
        {
            id: 1,
            icon: "fa-solid fa-chart-simple",
            link: "/",
            name: "Tổng quan",
        },
        {
            id: 2,
            icon: "fa-solid fa-newspaper",
            link: "/bai_dang",
            name: "Bài đăng",
        },
        {
            id: 3,
            icon: "fa-solid fa-flag",
            link: "/bao_cao",
            name: "Báo cáo",
        },

        {
            id: 4,
            icon: "fa-solid fa-bell",
            link: "/thong_bao",
            name: "Thông báo",
        },
    ];
    return (
        <div className="manage-post pt-[85px] h-[730px] px-8 grid grid-cols-6 gap-5 ">
            <div className="manage-nav col-span-1 px-2 py-2 rounded-2xl box-shadow-custom h-[655px]">
                <ManageNav nav={nav}></ManageNav>
            </div>
            <div className="manage-content col-span-5 rounded-2xl box-shadow-custom h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPost;
