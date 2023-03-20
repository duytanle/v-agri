import React, { useState } from "react";
import FilterDropdown from "../HomeProduct/Filter/FilterDropdown";
import FilterSort from "../HomeProduct/Filter/FilterSort";
import EmployeeAdd from "./Employees/EmployeeAdd";
import EmployeeEdit from "./Employees/EmployeeEdit";

const Employees = () => {
    const listData = [
        { name: "Tất cả", value: "all" },
        { name: "Quản lý sản phẩm", value: "post" },
        { name: "Quản lý đơn hàng", value: "order" },
    ];
    const [addEmp, setAddEmp] = useState(false);
    return (
        <div className="employees h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Quản lý nhân viên</div>
            {addEmp ? (
                <EmployeeAdd>
                    <div
                        className="absolute top-2 right-5 w-10 h-10 text-white bg-secondary-color p-1 rounded-full flex justify-center items-center text-lg cursor-pointer"
                        onClick={() => setAddEmp(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </EmployeeAdd>
            ) : (
                <>
                    <div className=" employees-tool flex items-center justify-center gap-10 mt-5 mb-9 animate__animated animate__fadeIn">
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
                                title="Vị trí làm việc"
                                iconTitle="fa-solid fa-chevron-down text-primary-color"
                                listData={listData}
                            ></FilterDropdown>
                        </div>
                        <div
                            className="tool-add w-10 h-10 p-2 bg-primary-color flex items-center justify-center rounded-full text-white cursor-pointer hover:bg-hover-priColor"
                            onClick={() => {
                                setAddEmp(true);
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <div className="employees-list grid grid-cols-10  gap-4 h-[500px] overflow-y-scroll p-2">
                        <div className="employee col-span-2  rounded-lg box-shadow-custom  cursor-pointer overflow-hidden h-[235px]">
                            <div className="employee-avatar h-[75%]">
                                <img
                                    src="https://images.unsplash.com/photo-1677264547596-dd003a4c7921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="employee-info py-[2px] px-1 text-center">
                                <div className="employee-name font-bold text-lg">
                                    Le Duy Tan
                                </div>
                                <div className="employee-position">
                                    Quan ly san pham
                                </div>
                            </div>
                        </div>
                        <div className="employee col-span-2  rounded-lg box-shadow-custom  cursor-pointer overflow-hidden h-[235px]">
                            <div className="employee-avatar h-[75%]">
                                <img
                                    src="https://images.unsplash.com/photo-1677264547596-dd003a4c7921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="employee-info py-[2px] px-1 text-center">
                                <div className="employee-name font-bold text-lg">
                                    Le Duy Tan
                                </div>
                                <div className="employee-position">
                                    Quan ly san pham
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* <EmployeeEdit
                defaultValues={{
                    empAvatar: "default",
                    empId: "B1906758",
                    empName: "Le Duy Tan",
                    empAccount: "B1906758",
                    empPassword: "123456",
                    empPosition: "manage-product",
                }}
            >
                <div
                    className="absolute top-2 right-5 w-10 h-10 text-white bg-secondary-color p-1 rounded-full flex justify-center items-center text-lg cursor-pointer"
                    onClick={() => setAddEmp(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </EmployeeEdit> */}
        </div>
    );
};

export default Employees;
