import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    const options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,

                font: {
                    size: 16,
                },
                color: "black",
            },

            legend: {
                labels: {
                    font: {
                        size: 15,
                    },
                    color: "black",
                },
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                font: {
                    size: 15,
                },
            },
        },
    };
    return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
};

export default PieChart;
