import React from "react";
import { useController } from "react-hook-form";
import "./CustomForm.css";
const Checkbox = ({ control, label, customCheckbox = "", ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: false,
    });
    return (
        <label
            className={` custom-checkbox cursor-pointer flex items-center gap-3 ${customCheckbox}`}
        >
            <input
                type="checkbox"
                {...field}
                value={props.value}
                id={props.name}
                checked={field.value}
                className="hidden"
                {...props}
            />
            <div className="h-[20px] w-[20px] shrink-0 flex items-center justify-center bg-white rounded-md border-2 border-primary-color">
                <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.7453 1.89733L3.93178 9.71087L0.254822 6.03391L1.17132 5.11741L3.93178 7.87137L10.8288 0.980835L11.7453 1.89733Z"
                        fill="white"
                    />
                </svg>
            </div>
            <label htmlFor={props.name} className="cursor-pointer">
                {label}
            </label>
        </label>
    );
};

export default Checkbox;
