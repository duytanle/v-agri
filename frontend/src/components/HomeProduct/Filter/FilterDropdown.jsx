import React, { useState } from "react";
import useClickOutSide from "../../../Hook/useClickOutSide";
const FilterDropdown = ({
    classDropdown = "",
    title,
    iconTitle,
    listData,
    ...props
}) => {
    const [label, setLabel] = useState(title);
    const [show, setShow, nodeRef] = useClickOutSide();
    const handleClickItem = (event) => {
        const itemValue = event.currentTarget.dataset.value;
        if (itemValue === "all") {
            setLabel(title);
        } else {
            setLabel(event.target.innerText);
        }
        props.setFilters(itemValue);
    };
    return (
        <>
            <div
                className={`${classDropdown}-title  border-2 border-primary-color px-2 py-1 rounded-lg flex justify-between items-center cursor-pointer relative w-[180px] `}
                onClick={(event) => {
                    event.preventDefault();

                    setShow(!show);
                }}
                ref={nodeRef}
            >
                <span> {label} </span>
                <i className={iconTitle}></i>
                <div
                    className={`${classDropdown}-list absolute border-2 border-primary-color top-[110%] left-0 w-full rounded-xl ${
                        show ? "" : "opacity-0 invisible"
                    } z-40 bg-gray-200`}
                >
                    {listData && listData.length > 0
                        ? listData.map((item) => (
                              <div
                                  className={`${classDropdown}-item px-2 py-1 hover:bg-primary-color hover:text-white first:rounded-t-[10px] last:rounded-b-[10px]`}
                                  onClick={handleClickItem}
                                  key={item.value}
                                  data-value={item.value}
                              >
                                  <span>{item.name}</span>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </>
    );
};

export default FilterDropdown;
