import React from "react";

const ChatList = () => {
    return (
        <div className="chat-list col-span-4 pr-5 h-[550px]">
            <div className="chat-list__title mb-8">
                <div className="search border-2 border-primary-color rounded-xl flex gap-2 p-[2px] overflow-hidden">
                    <input
                        type="text"
                        className="outline-none px-2 flex-1 text-[16px]"
                    />
                    <button className="outline-none bg-primary-color px-3 py-[1px] rounded-lg">
                        <i className="fa-solid fa-magnifying-glass text-white font-bold text-sm"></i>
                    </button>
                </div>
            </div>
            <div className="chat-list__content overflow-y-scroll h-[95%]">
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chat-item flex gap-2 border-b-[1px] border-b-primary-color mr-2 py-3 mb-2 cursor-pointer">
                    <div className="item-avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="item-info flex-1">
                        <div className="name font-bold text-1-line">
                            Le Duy Tan
                        </div>
                        <div className="short-chat text-sm text-1-line mt-1">
                            Xin chao, toi dai dien cho HTX Ninh Hoa Khanh Hoa
                        </div>
                    </div>
                    <div className="item-date flex flex-col gap-3 text-xs flex-shrink-0 text-right">
                        <div className="last-chat-date font-bold text-gray-500">
                            12 ngay
                        </div>
                        <div className="number-new-chat  ">
                            <span className="bg-secondary-color px-[6px] py-[1px] rounded-full text-white">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
