import React from "react";

const ChatContent = () => {
    return (
        <div className="chat-content col-span-8 bg-gray-200 rounded-lg p-3 relative">
            <div className="chat-user flex items-center gap-5 pb-3 border-b-[1px] border-primary-color">
                <div className="user-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="user-name flex-1">
                    <div className="font-bold text-lg">Le Duy Tan</div>
                    <div>
                        <span className="mr-3">
                            <i className="fa-regular fa-circle-dot text-primary-color"></i>
                        </span>
                        <span>Dang hoat dong</span>
                    </div>
                </div>
                <div className="search border-2 border-primary-color rounded-xl flex gap-2 p-[2px] overflow-hidden bg-white max-h-[35px]">
                    <input
                        type="text"
                        className="outline-none px-2 flex-1 text-[16px]"
                    />
                    <button className="outline-none bg-primary-color px-3 py-[1px] rounded-lg">
                        <i className="fa-solid fa-magnifying-glass text-white font-bold text-sm"></i>
                    </button>
                </div>
            </div>
            <div className="chat-box my-3 h-[400px] overflow-y-scroll">
                <div className="chat-message">
                    <div className="message-receive">
                        <div className="message-owner flex gap-2 items-center">
                            <div className="owner-avatar">
                                <img
                                    src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="h-6 w-6 rounded-full "
                                />
                            </div>
                            <div className="owner-name text-sm font-bold">
                                Le Duy Tan
                            </div>
                            <div className="time text-sm italic">3:44PM</div>
                        </div>
                        <div className="message-item  bg-primary-color text-white p-2 rounded-md w-max my-3 ml-6">
                            Rat dui de luon a
                        </div>
                        <div className="message-item  bg-primary-color text-white p-2 rounded-md w-max max-w-[70%] my-3 ml-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iure autem, dolore reprehenderit aspernatur
                            consequatur recusandae quasi doloremque accusantium
                            corrupti minus exercitationem. Accusantium nostrum
                            doloribus ratione non tempora dicta, modi illum.
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                    <div className="message-send flex flex-col items-end mr-6">
                        <div className="time text-sm italic">3:44PM</div>
                        <div className="message-item  bg-[#40abe4] text-white p-2 rounded-md w-max my-3 ">
                            Rat dui de luon a
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-send absolute left-6 bottom-5 right-6 bg-white rounded-lg flex gap-3 h-9 p-1 overflow-hidden">
                <input
                    type="text"
                    className="flex-1 outline-none pl-3"
                    placeholder="Nhắn tin tới Le Duy Tan"
                />
                <button className="h-full text-white bg-primary-color rounded-lg px-3">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatContent;
