import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
    LineController,
    BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
    LineController,
    BarController
);

const BarLineChart = ({ orderValue, orderNumber }) => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const data = {
        labels,
        datasets: [
            {
                type: "line",
                label: "Tổng giá trị đơn hàng",
                borderColor: "red",
                backgroundColor: "red",
                borderWidth: 3,
                fill: false,
                data: orderValue,
                yAxisID: "y1",
                tension: 0.5,
            },
            {
                type: "bar",
                label: "Số lượng đơn hàng",
                backgroundColor: "#007739",
                data: orderNumber,
                borderColor: "white",
                borderWidth: 2,
                yAxisID: "y",
            },
        ],
    };

    const optionsLineChart = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ số lượng và giá trị tổng đơn hàng theo tháng",

                font: {
                    size: 16,
                },
                color: "black",
            },
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                    color: "black",
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tháng",
                    color: "red",
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    font: {
                        size: 14,
                        color: "black",
                    },
                },
            },
            y: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                    display: true,
                    text: "Đơn hàng",
                    color: "red",
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    font: {
                        size: 14,
                        color: "black",
                    },
                },
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "Giá trị",
                    color: "red",
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    callback: (value) => value + " vnd",
                    font: {
                        size: 14,
                        color: "black",
                    },
                },
            },
        },
    };
    return <Chart type="bar" data={data} options={optionsLineChart} />;
};

export default BarLineChart;
