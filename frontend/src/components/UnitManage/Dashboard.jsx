import React from "react";
import BarLineChart from "../Chart/BarLineChart";
import PieChart from "../Chart/PieChart";
import DashboardNumber from "./Dashboard/DashboardNumber";

const Dashboard = () => {
    const dataPieChart = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                data: [120000, 190000, 300000, 500000, 200000, 300000],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="dashboard h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Tổng quan</div>
            <div className="dashboard-number my-2 flex justify-evenly">
                <DashboardNumber
                    iconClass="fa-solid fa-boxes-stacked"
                    number={3}
                    text="Sản phẩm"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-file-invoice"
                    number={3}
                    text="Đơn hàng"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-truck-fast"
                    number={3}
                    text="Đơn giao"
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
                        title="Biểu đồ cơ cấu giá trị đơn hàng theo sản phẩm"
                    ></PieChart>
                    <div className="absolute -bottom-5 left-0 italic">
                        (*) Đơn vị tính: triệu đồng
                    </div>
                </div>
                <div className="col-span-1 w-full h-[90%] text-xl mt-5">
                    <BarLineChart></BarLineChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
