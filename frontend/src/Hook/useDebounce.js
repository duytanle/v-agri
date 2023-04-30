import React, { useEffect } from "react";
import { useState } from "react";

const useDebounce = (query) => {
    const [queryDebounce, setQueryDebounce] = useState(query);
    useEffect(() => {
        const timer = setTimeout(() => {
            setQueryDebounce(query);
        }, 800);
        return () => {
            clearTimeout(timer);
        };
    }, [query]);
    return queryDebounce;
};

export default useDebounce;
