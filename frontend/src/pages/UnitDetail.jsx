import React from "react";
import Filter from "../components/HomeProduct/Filter";
import Products from "../components/HomeProduct/Products";
import UnitInfo from "../components/UnitDetail/UnitInfo";
import ProductAssess from "../components/ProductDetail/ProductAssess";
const UnitDetail = () => {
    return (
        <div className="unit-detail  pt-[80px] px-8">
            <UnitInfo></UnitInfo>
            <div className="products grid grid-cols-12 gap-4 mt-[220px] mb-5">
                <div className="col-span-8 p-4 rounded-lg box-shadow-custom max-h-[630px] overflow-y-scroll">
                    <Filter filter={true}></Filter>
                    <Products
                        viewIn="unit"
                        customProducts="grid-cols-4 gap-3"
                        customProduct="h-[260px]"
                    ></Products>
                </div>
                <div className="col-span-4">
                    <ProductAssess viewIn="unit"></ProductAssess>
                </div>
            </div>
        </div>
    );
};

export default UnitDetail;
