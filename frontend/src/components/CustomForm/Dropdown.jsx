import React, { useEffect, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import useClickOutSide from "../../Hook/useClickOutSide.jsx";
const Dropdown = ({
    control,
    setValue,
    labelDefault,
    dropdownData,
    customClass = "",
    customTitle = "",
    customListData = "",
    ...props
}) => {
    const [show, setShow, nodeRef] = useClickOutSide();
    const [label, setLabel] = useState(labelDefault);
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: "default",
    });
    const handleClickItem = (event) => {
        event.preventDefault();
        setShow(false);
        const valueTarget = event.currentTarget.dataset.value;
        setValue(props.name, valueTarget);
        valueTarget === "default"
            ? setLabel(labelDefault)
            : setLabel(event.currentTarget.textContent);
    };
    const valueDefault = useWatch({
        control,
        name: props.name,
        defaultValue: props.defaultValue || "default",
    });
    useEffect(() => {
        if (valueDefault === "default") setLabel(labelDefault);
        else {
            let i = 0;
            while (
                i < dropdownData.length &&
                dropdownData[i].value !== valueDefault
            ) {
                i++;
            }
            if (i < dropdownData.length) {
                setLabel(dropdownData[i].name);
            }
        }
    }, [valueDefault]);

    return (
        <div
            className={`dropdown relative ${customClass} cursor-pointer`}
            {...field}
        >
            <div
                className={`dropdown-title  rounded-lg border-2 border-primary-color focus:border-hover-priColor flex justify-between items-center ${customTitle}`}
                onClick={(event) => {
                    event.preventDefault();
                    setShow(!show);
                }}
                ref={nodeRef}
            >
                <span>{label}</span>
                <img
                    src="/images/arrow-down.png"
                    alt="Xổ xuống dữ liệu"
                    className="w-4 h-4 inline-block"
                />
            </div>
            <div
                className={`dropdown-select absolute z-10 bg-gray-200 rounded-lg top-[120%] left-0 w-full border-2 border-primary-color cursor-pointer ${
                    show ? "" : "invisible opacity-0"
                } ${customListData}`}
            >
                {dropdownData && dropdownData.length > 0
                    ? dropdownData.map((data, index) => (
                          <div
                              className=" p-2 hover:bg-primary-color hover:text-white first:rounded-t-md last:rounded-b-md"
                              key={index}
                              data-value={data.value}
                              onClick={handleClickItem}
                          >
                              {data.name}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Dropdown;
