import React from "react";

const ProductStandard = ({ standards, standardColor }) => {
    return (
        <div className="standards flex justify-between ">
            {standards && standards.length > 0 ? (
                standards.map((standard) => {
                    return (
                        <div
                            className={`standard-${standard.id} bg-${
                                standardColor[standard.id]
                            } px-[4px] text-[12px] rounded-sm text-white font-bold`}
                            key={standard.id}
                        >
                            {standard.name}
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
