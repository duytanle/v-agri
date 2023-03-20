import React, { useState } from "react";
import useClickOutSide from "../../../Hook/useClickOutSide";
import FilterDropdown from "../../HomeProduct/Filter/FilterDropdown";
const AnnounceList = () => {
    const listData = [
        { name: "Tất cả thông báo", value: "default" },
        { name: "Thông báo mới", value: "new" },
        { name: "Thông báo đã xem", value: "seen" },
    ];
    const handleShowContent = (event) => {
        const accordionHeader = event.currentTarget;
        const accordionContent = event.currentTarget.nextSibling;
        const accordionMaxHeight = accordionContent.style.maxHeight;
        if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
            accordionContent.style.maxHeight = `${
                accordionContent.scrollHeight + 32
            }px`;
            accordionHeader.querySelector(".fas").classList.remove("fa-plus");
            accordionHeader.querySelector(".fas").classList.add("fa-minus");
            accordionHeader.parentElement.classList.add("bg-indigo-50");
        } else {
            accordionContent.style.maxHeight = `0px`;
            accordionHeader.querySelector(".fas").classList.add("fa-plus");
            accordionHeader.querySelector(".fas").classList.remove("fa-minus");
            accordionHeader.parentElement.classList.remove("bg-indigo-50");
        }
    };
    return (
        <div className="announce-list h-[550px]">
            <div className=" announce-tool flex items-center justify-center gap-10 mt-5 mb-9 animate__animated animate__fadeIn">
                <div className="tool-search w-[300px] p-1 border-2 border-primary-color rounded-lg flex gap-2">
                    <input type="text" className="outline-none flex-1 ml-2" />
                    <button className="outline-none bg-primary-color px-3 py-[1px] rounded-lg">
                        <i className="fa-solid fa-magnifying-glass text-white font-bold text-sm"></i>
                    </button>
                </div>
                <div className="tool-sort flex gap-10 items-center">
                    <FilterDropdown
                        title="Tất cả thông báo"
                        iconTitle="fa-solid fa-chevron-down text-primary-color"
                        listData={listData}
                    ></FilterDropdown>
                </div>
            </div>
            <div className="announces w-[850px] h-[90%] p-2  mx-auto flex flex-col gap-5 over overflow-y-scroll ">
                <div className="transition hover:bg-indigo-50">
                    <div
                        className="accordion-header cursor-pointer transition flex space-x-5 px-5 py-2 items-center h-max "
                        onClick={handleShowContent}
                    >
                        <div className="owner-avatar w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1677541829506-2084c4bba14c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="title font-bold text-2-line flex-1 text-primary-color text-lg">
                            Don hang Khom Cau Duc cua HTX Cau Duc Vi Thanh Hau
                            Giang da bi huy mat tieu tu hom qua roi
                        </div>
                        <i className="fas fa-plus"></i>
                    </div>

                    <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                        <p className=" font-light text-justify">
                            Our asked sex point her she seems. New plenty she
                            horses parish design you. Stuff sight equal of my
                            woody. Him children bringing goodness suitable she
                            entirely put far daughter.lorem Lorem, ipsum dolor
                            sit amet consectetur adipisicing elit. Accusamus
                            placeat laboriosam voluptatem nisi reprehenderit ad
                            dignissimos esse, perferendis fugit nesciunt, quam
                            sed tempora veniam praesentium porro reiciendis
                            temporibus. Et, ullam. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Illum optio officiis
                            laudantium sint ab, non distinctio adipisci,
                            asperiores animi molestias ratione! Quidem facere
                            corrupti in illo enim omnis culpa aperiam?
                        </p>
                        <button className="rounded-full bg-secondary-color text-white font-lg font-bold px-6 py-2 my-5">
                            Xóa thông báo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnounceList;
