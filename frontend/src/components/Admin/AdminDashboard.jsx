import React from "react";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import DashboardNumber from "../UnitManage/Dashboard/DashboardNumber";

const AdminDashboard = () => {
    const dataPieChart = {
        labels: ["Hợp tác xã", "Doanh nghiệp", "Nhân viên", "Nhóm quản trị"],
        datasets: [
            {
                data: [120000, 190000, 300000, 388888],
                backgroundColor: [
                    "rgb(247, 200, 224)",
                    "rgb(223, 255, 216)",
                    "rgb(149, 189, 255)",
                    "rgb(253, 93, 93)",
                ],
                borderColor: [
                    "rgb(247, 200, 224)",
                    "rgb(223, 255, 216)",
                    "rgb(149, 189, 255)",
                    "rgb(253, 93, 93)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataBarChar = {
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        datasets: [
            {
                label: "Số tài khoản",
                data: [10, 12, 14, 15, 12, 23, 24, 12, 15, 16, 22, 30],
                backgroundColor: "#007739",
                borderColor: "#007739",
                borderWidth: 2,
            },
        ],
    };
    return (
        <div className="dashboard h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Tổng quan</div>
            <div className="dashboard-number my-2 flex justify-evenly ">
                <DashboardNumber
                    iconClass="fa-solid fa-user"
                    number="30"
                    text="Tài khoản"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-check-to-slot"
                    number={3}
                    text="Xác minh"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-users-slash"
                    number={3}
                    text="Vi phạm"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-triangle-exclamation"
                    number={3}
                    text="Cảnh báo"
                ></DashboardNumber>
            </div>
            <div className="dashboard-chart grid grid-cols-2 h-[75%] mt-10">
                <div className="chart-bar-order col-span-1  w-full h-[90%] mt-5 relative">
                    <PieChart
                        data={dataPieChart}
                        title="Biểu đồ cơ cấu giá số lượng tài khoản theo loại"
                    ></PieChart>
                    <div className="absolute -bottom-5 left-0 italic"></div>
                </div>
                <div className="col-span-1 w-full h-[90%] text-xl mt-5">
                    <BarChart
                        data={dataBarChar}
                        title="Biểu đồ thể hiện số lượng tài khoản tạo mới theo tháng"
                    ></BarChart>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
