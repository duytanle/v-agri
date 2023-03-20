import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterDropdown from "../../HomeProduct/Filter/FilterDropdown";
import FilterSort from "../../HomeProduct/Filter/FilterSort";
import AccountForm from "./AccountForm";

const AccountManage = () => {
    const listData = [
        { name: "Tất cả", value: "all" },
        { name: "Hợp tác xã", value: "HTX" },
        { name: "Doanh nghiệp", value: "DN" },
        { name: "Nhân viên", value: "NV" },
        { name: "Quản trị", value: "QT" },
    ];
    const [addAccount, setAddAccount] = useState(false);
    return (
        <>
            {addAccount ? (
                <AccountForm textButtonSubmit="Thêm">
                    <div
                        className="absolute bg-secondary-color w-10 h-10 rounded-full top-3 right-5 text-white text-xl font-bold flex justify-center items-center cursor-pointer"
                        onClick={() => setAddAccount(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </AccountForm>
            ) : (
                <>
                    <div className="admin-account_filter flex items-center justify-center gap-10 mt-5 mb-9 animate__animated animate__fadeIn">
                        <div className="tool-search w-[300px] p-1 border-2 border-primary-color rounded-lg flex gap-2">
                            <input
                                type="text"
                                className="outline-none flex-1 ml-2"
                            />
                            <button className="outline-none bg-primary-color px-3 py-[1px] rounded-lg">
                                <i className="fa-solid fa-magnifying-glass text-white font-bold text-sm"></i>
                            </button>
                        </div>
                        <div className="tool-sort flex gap-10 items-center">
                            <p className="sort-title">Sắp xếp theo: </p>
                            <FilterSort
                                type={{ name: "Mới thêm", value: "new" }}
                            ></FilterSort>
                            <FilterDropdown
                                title="Loại tài khoản"
                                iconTitle="fa-solid fa-chevron-down text-primary-color"
                                listData={listData}
                            ></FilterDropdown>
                        </div>
                        <div
                            className="tool-add w-10 h-10 p-2 bg-primary-color flex items-center justify-center rounded-full text-white cursor-pointer hover:bg-hover-priColor"
                            onClick={() => {
                                setAddAccount(true);
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <div className="account-list grid grid-cols-10  gap-4 h-[500px] overflow-y-scroll p-2">
                        <Link
                            to="/tai_khoan/chi_tiet/09"
                            className="account col-span-2  rounded-lg box-shadow-custom  cursor-pointer overflow-hidden h-[235px]"
                        >
                            <div className="account-avatar h-[75%]">
                                <img
                                    src="https://images.unsplash.com/photo-1677264547596-dd003a4c7921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="account-info py-[2px] px-1 text-center">
                                <div className="account-info--header font-bold text-lg">
                                    Lê Duy Tân
                                </div>
                                <div className="account-info-footer flex justify-between px-2">
                                    <span>ND_000001</span>
                                    <span>HTX</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default AccountManage;