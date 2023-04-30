import React, { useEffect, useState } from "react";

const FilterSort = ({ type, ...props }) => {
    const [on, setOn] = useState(false);
    const handleClickSort = () => {
        setOn(!on);
        props.onHandleSort();
    };
    return (
        <div className={`sort-${type.value}`}>
            <button
                className={`sort-button  px-2 py-1 border-2 rounded-xl ${
                    on
                        ? "border-primary-color bg-primary-color"
                        : "border-gray-300 bg-gray-300"
                } text-white`}
                onClick={(event) => {
                    event.preventDefault();
                    handleClickSort();
                }}
            >
                {type.name}
            </button>
        </div>
    );
};

export default FilterSort;
