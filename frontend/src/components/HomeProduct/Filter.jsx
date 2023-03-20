import React from "react";
import FilterDropdown from "./Filter/FilterDropdown";
import FilterSort from "./Filter/FilterSort";
const Filter = ({ filter = false, children, customFilter = "" }) => {
    const sortData = [
        { name: "Mới nhất", value: "new" },
        { name: "Bán chạy", value: "top-sell" },
    ];
    const standardData = [
        { name: "Tất cả", value: "all" },
        { name: "OCOP", value: "OCOP" },
        { name: "VietGap", value: "VG" },
        { name: "GlobalGAP", value: "GB" },
    ];
    const priceData = [
        { name: "Mặc định", value: "all" },
        { name: "Tăng dần", value: "increase" },
        { name: "Giảm dần", value: "decrease" },
    ];

    return (
        <div className="content-filter mt-1 flex justify-evenly">
            <div className="filter-search border-2 border-primary-color rounded-xl  flex  overflow-hidden p-1">
                <input
                    type="text"
                    className="search-input outline-none flex-1 px-2 "
                />
                <button className="search-button bg-primary-color px-2 py-1 border-2 border-primary-color rounded-xl text-white">
                    Tìm kiếm
                </button>
            </div>
            <div className="filter-sort flex flex-1 gap-5  items-center">
                <div className={`sort-title ${customFilter}`}>Sắp xếp theo</div>
                {!filter
                    ? sortData.map((item) => (
                          <FilterSort type={item} key={item.value}></FilterSort>
                      ))
                    : null}
                <div className="sort-standard relative cursor-pointer w-[160px] mr-3">
                    <FilterDropdown
                        title="Chuẩn sản phẩm"
                        iconTitle={`fa-solid fa-chevron-down text-primary-color h-3 w-3 -mt-1`}
                        classDropdown="standard"
                        listData={standardData}
                    ></FilterDropdown>
                </div>
                <div className="sort-price relative cursor-pointer w-[120px]">
                    <FilterDropdown
                        title="Giá"
                        iconTitle={`fa-solid fa-chevron-down text-primary-color h-3 w-3 -mt-1`}
                        classDropdown="price"
                        listData={priceData}
                    ></FilterDropdown>
                </div>
            </div>
            {children}
            <div className="tool-page flex items-center p-1">
                <button className="px-2 border-2 border-primary-color rounded-xl h-full">
                    <img
                        src="./images/arrow-left.png"
                        alt="Qua trái"
                        className="w-3 h-3"
                    />
                </button>
                <span className="mx-2">1/9</span>
                <button className="px-2 border-2 border-primary-color rounded-xl h-full">
                    <img
                        src="./images/arrow-right.png"
                        alt="Qua phải"
                        className="w-3 h-3"
                    />
                </button>
            </div>
        </div>
    );
};

export default Filter;
