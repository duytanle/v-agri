import React, { useState } from "react";
import Tabs from "./Setting/Tabs";

const Setting = () => {
    const [tab, setTab] = useState("unit");
    return (
        <div
            className={`setting  py-3 px-5 ${
                tab === "unit" ? "h-[1710px]" : "h-full"
            }`}
        >
            <div className=" font-bold text-2xl ">Cài đặt</div>
            <Tabs tab={tab} setTab={setTab}></Tabs>
        </div>
    );
};

export default Setting;
