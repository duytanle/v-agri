import React from "react";
import { useController } from "react-hook-form";
import "./CustomForm.css";
const Radio = ({ control, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: props.value,
    });
    return (
        <label
            className={`cursor-pointer custom-radio h-[20px] w-[20px] shrink-0 flex justify-center items-center bg-white rounded-full border-2 border-primary-color ${props.custom}`}
        >
            <input
                {...field}
                type="radio"
                value={props.value}
                className="hidden"
                {...props}
            />
            <div className="w-[12px] h-[12px] bg-white rounded-full"></div>
        </label>
    );
};

export default Radio;
