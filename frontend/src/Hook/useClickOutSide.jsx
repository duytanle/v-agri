import React, { useEffect, useRef, useState } from "react";

const useClickOutSide = () => {
    const [show, setShow] = useState(false);
    const nodeRef = useRef(null);
    useEffect(() => {
        function handleClickOutSide(event) {
            if (nodeRef.current && !nodeRef.current.contains(event.target)) {
                setShow(false);
            }
        }
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, []);
    return [show, setShow, nodeRef];
};

export default useClickOutSide;
