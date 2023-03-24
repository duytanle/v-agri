import React from "react";
import { useSelector } from "react-redux";

const Intro = () => {
    const { user } = useSelector((state) => state.auth);
    const groupProduct = () => {
        let result = [];
    };
    return (
        <div className="manage-order h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">
                Quản lý danh sách chào hàng
            </div>
            {user.LND_MaLND === "DN" ? <div></div> : null}
        </div>
    );
};

export default Intro;
