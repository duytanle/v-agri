import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminVerify = () => {
    return (
        <div className="admin-account h-max py-3 px-5 ">
            <div className=" admin-account__title font-bold text-2xl ">
                Xác minh thông tin
            </div>
            <Outlet />
        </div>
    );
};

export default AdminVerify;
