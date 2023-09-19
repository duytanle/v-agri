import React from "react";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import DashboardNumber from "../UnitManage/Dashboard/DashboardNumber";
import { useSelector } from "react-redux";

const AdPostDashboard = () => {
    const { dashboard } = useSelector((state) => state.post);
    const pieData = dashboard
        ? [dashboard.dnProduct, dashboard.htxProduct]
        : [0, 0];
    const columnData = () => {
        let data = Array(12).fill(0);
        dashboard?.columnData?.map((item) => {
            data[parseInt(item.month) - 1] = item.sanPham;
        });
        return data;
    };
    const dataPieChart = {
        labels: ["Doanh Nghiệp", "HTX"],
        datasets: [
            {
                data: pieData,
                backgroundColor: ["rgb(149, 189, 255)", "rgb(253, 93, 93)"],
                borderColor: ["rgb(149, 189, 255)", "rgb(253, 93, 93)"],
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
                label: "Số bài đăng",
                data: columnData(),
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
                    iconClass="fa-solid fa-newspaper"
                    number={dashboard ? dashboard.product : 0}
                    text="Bài đăng"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-check-to-slot"
                    number={dashboard ? dashboard.productVerify : 0}
                    text="Xác nhận chuẩn"
                ></DashboardNumber>
                <DashboardNumber
                    iconClass="fa-solid fa-flag"
                    number={0}
                    text="Báo cáo"
                ></DashboardNumber>
                {/* <DashboardNumber
                    iconClass="fa-solid fa-triangle-exclamation"
                    number={3}
                    text="Cảnh báo"
                ></DashboardNumber> */}
            </div>
            <div className="dashboard-chart grid grid-cols-2 h-[75%] mt-10">
                <div className="chart-bar-order col-span-1  w-full h-[90%] mt-5 relative">
                    <PieChart
                        data={dataPieChart}
                        title="Biểu đồ cơ cấu số lượng bài đăng sản phẩm theo loại"
                    ></PieChart>
                    <div className="absolute -bottom-5 left-0 italic"></div>
                </div>
                <div className="col-span-1 w-full h-[90%] text-xl mt-5">
                    <BarChart
                        data={dataBarChar}
                        title="Biểu đồ thể hiện số lượng bài đăng sản phẩm mới theo tháng"
                    ></BarChart>
                </div>
            </div>
        </div>
    );
};

export default AdPostDashboard;
