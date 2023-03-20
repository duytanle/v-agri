import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminAccount = () => {
    return (
        <div className="admin-account h-full py-3 px-5 ">
            <div className=" admin-account__title font-bold text-2xl ">
                Quản lý tài khoản
            </div>
            <Outlet />
        </div>
    );
};

export default AdminAccount;
