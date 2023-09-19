import React from "react";
import BarLineChart from "../Chart/BarLineChart";
import PieChart from "../Chart/PieChart";
import DashboardNumber from "./Dashboard/DashboardNumber";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { dashboard } = useSelector((state) => state.common);
    const labelsPie = () => {
        let labels =
            dashboard?.pieData?.map((item) => item.SP_TenSanPham) || "";
        if (dashboard?.pieData?.length < 5) {
            return labels;
        } else {
            return [...labels.slice(0, 5), "Sản phẩm khác"];
        }
    };
    const dataPie = () => {
        let data = dashboard?.pieData?.map((item) => item.TotalValue) || [];
        if (dashboard?.pieData?.length < 5) {
            return data;
        } else {
            let dataOutOf = data
                .slice(5)
                .reduce(
                    (accumulator, item) => accumulator + item.TotalValue,
                    data[5]?.TotalValue
                );
            return [...data.slice(0, 5), dataOutOf];
        }
    };
    const monthOrderNumber = () => {
        let data = Array(12).fill(0);
        dashboard?.columnData?.map((item) => {
            data[parseInt(item.Month)] = item.MonthOrder;
        });
        return data;
    };
    const monthValueNumber = () => {
        let data = Array(12).fill(0);
        dashboard?.columnData?.map((item) => {
            data[parseInt(item.Month)] = item.MonthValue || 0;
        });
        return data;
    };
    const dataPieChart = {
        labels: labelsPie(),
        datasets: [
            {
                data: dataPie(),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
                    number={dashboard?.product}
                    text="Sản phẩm"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-file-invoice"
                    number={dashboard?.orderAwait}
                    text="Đơn hàng"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-truck-fast"
                    number={dashboard?.orderProgress}
                    text="Đơn giao"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-triangle-exclamation"
                    number={dashboard?.warning}
                    text="Cảnh báo"
                ></DashboardNumber>
            </div>
            <div className="dashboard-chart grid grid-cols-2 h-[75%] mt-10">
                <div className="chart-bar-order col-span-1  w-full h-[90%] mt-5 relative">
                    {dashboard?.pieData?.length > 0 ? (
                        <>
                            <PieChart
                                data={dataPieChart}
                                title="Biểu đồ cơ cấu giá trị đơn hàng theo sản phẩm"
                            ></PieChart>
                            <div className="absolute -bottom-5 left-0 italic">
                                (*) Đơn vị tính: triệu đồng
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-lg font-bold">
                                Biểu đồ cơ cấu giá trị đơn hàng theo sản phẩm
                            </p>
                            <p className="text-red-600">
                                Chưa có dữ kiện đơn đặt hàng
                            </p>
                            <div className="div">
                                <img
                                    src="./images/no-data-pie.png"
                                    alt=""
                                    className="w-[380px] h-[380px]"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1 w-full h-[90%] text-xl mt-5">
                    <BarLineChart
                        orderNumber={monthOrderNumber()}
                        orderValue={monthValueNumber()}
                    ></BarLineChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
