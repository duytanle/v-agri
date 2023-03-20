import { useState } from "react";
import SettingManager from "./SettingManager";
import SettingUnit from "./SettingUnit";

function Tabs({ tab, setTab }) {
    // const [toggleState, setToggleState] = useState("");

    // const toggleTab = (index) => {
    //     setToggleState(index);
    // };

    return (
        <div className="setting-tabs flex flex-col h-[600px] relative pt-2">
            <div className="title-tabs grid grid-cols-2 gap-5">
                <button
                    className={` p-3 text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                        tab === "unit"
                            ? "bg-white text-black active-tabs"
                            : "text-white"
                    }`}
                    onClick={() => setTab("unit")}
                >
                    Thông tin đơn vị
                </button>
                <button
                    className={` p-3 text-center relative outline-none bg-primary-color rounded-md  font-bold text-lg ${
                        tab === "manager"
                            ? "bg-white text-black active-tabs"
                            : "text-white"
                    }`}
                    onClick={() => setTab("manager")}
                >
                    Thông tin cá nhân
                </button>
            </div>

            <div className="content-tabs w-full h-full mt-5">
                <div
                    className={` w-full h-full  ${
                        tab === "unit"
                            ? "block animate__animated animate__fadeIn"
                            : "hidden"
                    }`}
                >
                    <div className="w-full h-full box-shadow-custom rounded-xl">
                        <SettingUnit></SettingUnit>
                    </div>
                </div>

                <div
                    className={` w-full h-full  ${
                        tab === "manager"
                            ? "block animate__animated animate__fadeIn"
                            : "hidden"
                    }`}
                >
                    <div className="w-full h-full box-shadow-custom rounded-xl">
                        <SettingManager></SettingManager>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tabs;
