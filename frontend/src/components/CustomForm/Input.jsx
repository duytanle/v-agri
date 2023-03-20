import React from "react";
import { useController } from "react-hook-form";
const Input = ({ control, customClass, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: "",
    });
    return (
        <input
            {...field}
            {...props}
            className={`input-${props.name} ${customClass}  outline-none`}
        />
    );
};

export default Input;
