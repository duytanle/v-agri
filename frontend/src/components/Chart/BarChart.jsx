import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data, title }) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 14,
                    },
                    color: "black",
                },
            },
            title: {
                display: true,
                text: title,

                font: {
                    size: 16,
                },
                color: "black",
            },
        },
    };

    return <Bar options={options} data={data} />;
};
export default BarChart;
