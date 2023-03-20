import React from "react";
import AnnounceList from "./Announce/AnnounceList";
const Announce = () => {
    return (
        <div className="announce h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Quản lý thông báo</div>
            <AnnounceList></AnnounceList>
        </div>
    );
};

export default Announce;
