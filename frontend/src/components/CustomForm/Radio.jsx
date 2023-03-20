import React from "react";
import { useController } from "react-hook-form";
import "./CustomForm.css";
const Radio = ({ control, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: "",
    });
    return (
        <label className="h-[10px] w-[10px] cursor-pointer custom-radio">
            <input type="radio" {...field} {...props} className="hidden" />
            <div className="h-full w-full bg-white rounded-full"></div>
        </label>
    );
};

export default Radio;
