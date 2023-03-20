import React from "react";

const DashboardNumber = ({ iconClass, number, text }) => {
    return (
        <div className=" min-w-[120px] bg-primary-color rounded-xl text-white p-2">
            <div className="flex justify-evenly items-center">
                <span className="icon mr-3">
                    <i className={`${iconClass} text-2xl`}></i>
                </span>
                <span className="text-3xl">{number}</span>
            </div>
            <p className="text-xl mt-1 text-center">{text}</p>
        </div>
    );
};

export default DashboardNumber;
