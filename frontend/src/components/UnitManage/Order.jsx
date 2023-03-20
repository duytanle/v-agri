import React from "react";
import { Outlet } from "react-router-dom";

const Order = () => {
    return (
        <div className="manage-order h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Quản lý đơn hàng</div>
            <Outlet />
        </div>
    );
};

export default Order;
