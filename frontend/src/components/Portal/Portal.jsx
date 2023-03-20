import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const createElement = () => {
    const divElement = document.createElement("div");
    divElement.id = "portal-element";
    return divElement;
};
const portalElement = createElement();

const Portal = ({
    containerClassName = "",
    overlay = false,
    bodyClassName = "",
    onClose = () => {},
    children,
}) => {
    useEffect(() => {
        document.body.appendChild(portalElement);
    }, []);

    const contentRender = (
        <div className={containerClassName}>
            {overlay && (
                <div
                    className="overlay absolute inset-0 bg-gray-500 bg-opacity-50"
                    onClick={onClose}
                ></div>
            )}
            <div className={bodyClassName}>{children}</div>
        </div>
    );
    return createPortal(contentRender, portalElement);
};

export default Portal;
