import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManageNav from "../components/UnitManage/ManageNav";
import { useDispatch, useSelector } from "react-redux";
const AdminFinance = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const nav = [
        {
            id: 1,
            icon: "fa-solid fa-chart-simple",
            link: "/",
            name: "Thanh toán",
        },
    ];

    return (
        <div className="manage-post pt-[85px] h-[730px] px-8 grid grid-cols-6 gap-5 ">
            <div className="manage-nav col-span-1 px-2 py-2 rounded-2xl box-shadow-custom h-[655px]">
                <ManageNav nav={nav}></ManageNav>
            </div>
            <div className="manage-content col-span-5 rounded-2xl box-shadow-custom h-full p-3">
                <div className="title font-bold text-xl">
                    Quản lý thanh toán
                </div>
            </div>
        </div>
    );
};

export default AdminFinance;
