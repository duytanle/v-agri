import React, { useEffect, useState } from "react";
import { useController, useWatch } from "react-hook-form";

const EmployeeAvatar = ({ control, customClass, setValue, ...props }) => {
    const [avatar, setAvatar] = useState(props.defaultAvatar);

    const handlePreviewAvatar = (event) => {
        const fileString = URL.createObjectURL(event.target.files[0]);
        setAvatar(fileString);
        setValue(props.name, event.target.files[0]);
        {
            props.setCheckImageProduct
                ? props.setCheckImageProduct(false)
                : null;
        }
    };

    const valueDefault = useWatch({
        control,
        name: props.name,
        defaultValue: "",
    });

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    useEffect(() => {
        if (valueDefault === "default") {
            setAvatar(props.defaultAvatar);
        }
    }, [valueDefault]);

    return (
        <div className={`emp-avatar relative ${customClass} rounded-full`}>
            <img
                src={avatar}
                alt=""
                className="h-full w-full rounded-full object-cover "
            />
            <label
                className="absolute bottom-0 right-8 w-10 h-10 rounded-full bg-primary-color flex justify-center items-center cursor-pointer z-20"
                htmlFor={props.name}
            >
                <i className="fa-solid fa-pen-to-square text-white font-bold"></i>

                <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    name={props.name}
                    id={props.id}
                    onChange={handlePreviewAvatar}
                />
            </label>
            {props.children}
        </div>
    );
};

export default EmployeeAvatar;
