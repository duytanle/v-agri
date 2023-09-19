import React, { useEffect, useState } from "react";
import FilterDropdown from "./Filter/FilterDropdown";
import FilterSort from "./Filter/FilterSort";
import useDebounce from "../../Hook/useDebounce";
import { useSelector } from "react-redux";
const Filter = ({
    filter = false,
    children,
    customFilter = "",
    pagination,
    setPagination,
    filters,
    setFilters,
}) => {
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.auth);
    const queryDebounce = useDebounce(query);
    const sortData = [
        { name: "Mới nhất", value: "new" },
        { name: "Bán chạy", value: "top" },
    ];
    const standardData = [
        { name: "Tất cả", value: "all" },
        { name: "OCOP", value: "OCOP" },
        { name: "VietGAP", value: "VietGAP" },
        { name: "GlobalGAP", value: "GlobalGAP" },
    ];
    const priceData = [
        { name: "Mặc định", value: "all" },
        { name: "Tăng dần", value: "ASC" },
        { name: "Giảm dần", value: "DESC" },
    ];

    const totalPage = Math.ceil(pagination.totalRow / pagination.limit);
    const handleFilterSort = (value) => {
        switch (value) {
            case "new": {
                setFilters((prev) => {
                    return { ...prev, productNew: !prev.productNew };
                });
                break;
            }
            case "top": {
                setFilters((prev) => {
                    return { ...prev, productTop: !prev.productTop };
                });
                break;
            }
        }
    };
    useEffect(() => {
        setFilters((prev) => {
            return {
                ...prev,
                search: queryDebounce,
            };
        });
    }, [queryDebounce]);
    return (
        <div className="content-filter mt-1 flex justify-evenly">
            <div className="filter-search border-2 border-primary-color rounded-xl  flex  overflow-hidden p-1">
                <i className="fa-solid fa-magnifying-glass text-primary-color text-xl px-2"></i>
                <input
                    type="text"
                    className="search-input outline-none flex-1 px-2 "
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />
            </div>
            <div className="filter-sort flex flex-1 gap-5  items-center">
                {!filter ? (
                    <>
                        <div className={`sort-title ${customFilter}`}>
                            Sắp xếp theo
                        </div>

                        {sortData.map((item) => (
                            <FilterSort
                                type={item}
                                key={item.value}
                                onHandleSort={() =>
                                    handleFilterSort(item.value)
                                }
                            ></FilterSort>
                        ))}

                        {user?.LND_MaLND === "DN" ? (
                            <div className="sort-standard relative cursor-pointer w-[160px] mr-3">
                                <FilterDropdown
                                    title="Chuẩn sản phẩm"
                                    iconTitle={`fa-solid fa-chevron-down text-primary-color h-3 w-3 -mt-1`}
                                    classDropdown="standard"
                                    listData={standardData}
                                    setFilters={(value) => {
                                        setFilters((prev) => {
                                            return {
                                                ...prev,
                                                productStandard: value,
                                            };
                                        });
                                    }}
                                ></FilterDropdown>
                            </div>
                        ) : null}
                        <div className="sort-price relative cursor-pointer w-[120px]">
                            <FilterDropdown
                                title="Giá"
                                iconTitle={`fa-solid fa-chevron-down text-primary-color h-3 w-3 -mt-1`}
                                classDropdown="price"
                                listData={priceData}
                                setFilters={(value) => {
                                    setFilters((prev) => {
                                        return {
                                            ...prev,
                                            productPrice:
                                                value == "all" ? "" : value,
                                        };
                                    });
                                }}
                            ></FilterDropdown>
                        </div>
                    </>
                ) : null}
            </div>
            {children}
            <div className="tool-page flex items-center p-1">
                <button
                    className="px-2 border-2 border-primary-color rounded-xl h-full"
                    disabled={pagination.page === 1}
                    onClick={() => {
                        setPagination((prev) => ({
                            ...prev,
                            page: pagination.page - 1,
                        }));
                    }}
                >
                    <i className="fa-solid fa-angle-left text-primary-color"></i>
                </button>
                <span className="mx-2">
                    {pagination.page}/{totalPage}
                </span>
                <button
                    className="px-2 border-2 border-primary-color rounded-xl h-full"
                    disabled={pagination.page === totalPage}
                    onClick={() => {
                        setPagination((prev) => ({
                            ...prev,
                            page: pagination.page + 1,
                        }));
                    }}
                >
                    <i className="fa-solid fa-angle-right text-primary-color"></i>
                </button>
            </div>
        </div>
    );
};

export default Filter;
