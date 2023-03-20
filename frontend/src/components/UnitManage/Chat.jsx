import React from "react";
import ChatContent from "./Chat/ChatContent";
import ChatList from "./Chat/ChatList";

const Chat = () => {
    return (
        <div className="manage-chat h-full">
            <div className="title font-bold text-2xl pt-3 px-5 mb-2">
                Tin nhắn
            </div>
            <div className=" grid grid-cols-12 pb-3 px-5 h-[90%]">
                <ChatList></ChatList>
                <ChatContent></ChatContent>
            </div>
        </div>
    );
};

export default Chat;
