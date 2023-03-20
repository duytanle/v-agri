import React, { useEffect } from "react";
import useClickOutSide from "../../Hook/useClickOutSide";
import "animate.css";
const HeaderEx = ({
    imgLink,
    imgDesc,
    number,
    title,
    children,
    footer,
    button,
}) => {
    const [show, setShow, nodeRef] = useClickOutSide();

    return (
        <>
            <div
                className="extension h-[30px] w-[30px] relative "
                ref={nodeRef}
            >
                <div
                    className=""
                    onClick={() => {
                        setShow(!show);
                    }}
                >
                    <img
                        src={imgLink}
                        alt={imgDesc}
                        className="h-full w-full cursor-pointer"
                    />
                    <div className="absolute w-2 h-2 bg-secondary-color flex justify-center items-center p-[10px] rounded-full text-white font-bold -top-3 -right-2 text-xs cursor-pointer">
                        {number}
                    </div>
                </div>
                <div
                    className={` absolute top-[170%] -right-3 w-[400px] max-h-[315px] box-shadow-custom bg-white rounded-md border-2 border-secondary-color px-4 py-2  ${
                        show ? "animate__animated animate__fadeIn" : "hidden"
                    }`}
                >
                    <div
                        className="absolute -top-[36px] right-2 border-[18px]  border-secondary-color border-t-transparent border-l-transparent border-r-transparent cursor-pointer"
                        onClick={() => {
                            setShow(!show);
                        }}
                    ></div>
                    <div className="content w-full h-full">
                        <div className="title font-bold">{title}</div>
                        {children}
                        <div className="cart-footer flex justify-between items-center mt-4">
                            <span className="text-sm italic">{footer}</span>
                            <button className="p-2 bg-primary-color text-white rounded-md font-bold hover:bg-hover-priColor">
                                {button}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderEx;
