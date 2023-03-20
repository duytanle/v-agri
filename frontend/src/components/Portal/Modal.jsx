import React from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";

const Modal = ({ visible, onClose, bodyClassName = "", children }) => {
    return (
        <>
            <CSSTransition
                in={visible}
                timeout={0}
                classNames="zoom"
                unmountOnExit
            >
                {(status) => (
                    <Portal
                        visible={status !== "exited"}
                        containerClassName="fixed z-[1000] inset-0 flex items-center justify-center"
                        bodyClassName={`relative ${bodyClassName}`}
                        onClose={onClose}
                        overlay={true}
                    >
                        {children}
                    </Portal>
                )}
            </CSSTransition>
        </>
    );
};

export default Modal;
