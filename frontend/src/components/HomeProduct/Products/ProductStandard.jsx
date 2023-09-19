import React from "react";

const ProductStandard = ({ standards, standardColor }) => {
    return (
        <div className="standards flex gap-2 ">
            {standards && standards.length > 0 ? (
                standards.map((standard) => {
                    return (
                        <div
                            className={`standard-${standard} bg-${standardColor[standard]} px-[4px] text-[12px] rounded-sm text-white font-bold min-w-[60px] text-center`}
                            key={standard}
                        >
                            {standard}
                        </div>
                    );
                })
            ) : (
                <div className="h-[24px]"></div>
            )}
        </div>
    );
};

export default ProductStandard;
