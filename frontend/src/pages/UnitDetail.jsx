import React, { useEffect, useState } from "react";
import Filter from "../components/HomeProduct/Filter";
import Products from "../components/HomeProduct/Products";
import UnitInfo from "../components/UnitDetail/UnitInfo";
import ProductAssess from "../components/ProductDetail/ProductAssess";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
const UnitDetail = () => {
    const param = useParams().id;
    const { products } = useSelector((state) => state.product);

    const [filters, setFilters] = useState({
        search: "",
        unitID: param,
        type: "all",
        productNew: "",
        productTop: false,
        productStandard: "all",
        productPrice: "",
        category: "",
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
        totalRow: products.length,
    });
    const dispatch = useDispatch();
    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };
    useEffect(() => {
        dispatch({
            type: "COMMON_GET_UNIT_DETAIL",
            payload: param,
        });
        dispatch({
            type: "GET_PRODUCT",
            payload: queryString.stringify(filters),
        });
        dispatch({
            type: "COMMON_GET_ASSESS_UNIT",
            payload: `DV_MaDV=${param}`,
        });
    }, []);
    useEffect(() => {
        setPagination({ ...pagination, totalRow: products.length });
    }, [products]);
    return (
        <div className="unit-detail  pt-[80px] px-8">
            <UnitInfo></UnitInfo>
            <div className="products grid grid-cols-12 gap-4 mt-[220px] mb-5">
                <div className="col-span-8 p-4 rounded-lg box-shadow-custom max-h-[630px] overflow-y-scroll">
                    <Filter
                        filter={true}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        filters={filters}
                        setFilters={setFilters}
                    ></Filter>
                    <Products
                        viewIn="unit"
                        customProducts="grid-cols-4 gap-3"
                        customProduct="h-[260px]"
                        pagination={pagination}
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
