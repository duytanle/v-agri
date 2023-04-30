import React from "react";
import { useSelector } from "react-redux";
const Category = ({ ...props }) => {
    const listImage = [
        "essential-oil",
        "flower",
        "forest",
        "rice",
        "vegetable",
        "seeds",
        "fruits",
        "fish",
        "milk",
    ];
    const { category } = useSelector((state) => state.product);
    const handleOnClick = (event, DMSP_MaDMSP) => {
        const nodeListItem =
            event.currentTarget.parentNode.querySelectorAll(".category-item");
        const currentHiddenNode =
            event.currentTarget.childNodes[1].childNodes[1];
        const checkHiddenClass = currentHiddenNode.classList.contains("hidden");
        Array.from(nodeListItem).map((item, index) => {
            let arrowItem = item.childNodes[1].childNodes[1];
            if (!arrowItem.classList.contains("hidden")) {
                arrowItem.classList.add("hidden");
            }
        });
        if (checkHiddenClass) {
            currentHiddenNode.classList.remove("hidden");
            console.log(props.filters);
            props.setFilters((prev) => {
                return { ...prev, category: DMSP_MaDMSP };
            });
        } else {
            props.setFilters((prev) => {
                return { ...prev, category: "" };
            });
        }
    };
    return (
        <div className="categories">
            <p className="title text-xl font-bold my-4">Danh mục sản phẩm</p>
            <div className="mt-3">
                {category.map((item, index) => {
                    return (
                        <div
                            className={`category-item flex items-center py-3`}
                            key={item.DMSP_MaDMSP}
                            onClick={(event) => {
                                handleOnClick(event, item.DMSP_MaDMSP);
                            }}
                        >
                            <img
                                src={`/images/${listImage[index]}.png`}
                                alt={item.DMSP_TenDanhMuc}
                                className="category-img w-8 h-8 mr-4  cursor-pointer"
                            />
                            <div className="category-text text-lg  cursor-pointer relative flex-1 ">
                                <span>{item.DMSP_TenDanhMuc}</span>
                                <div className="absolute w-full h-[2px] bg-primary-color hidden">
                                    <div className="absolute -top-[4px] -right-[1px] rotate-45 w-[12px] h-[2px] bg-primary-color"></div>
                                    <div className="absolute top-[4px] right-0 -rotate-45 w-[12px] h-[2px] bg-primary-color"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
