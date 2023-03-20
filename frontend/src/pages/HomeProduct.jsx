import React from "react";
import Filter from "../components/HomeProduct/Filter";
import Category from "../components/HomeProduct/Category";
import Products from "../components/HomeProduct/Products";
import axios from "axios";
const HomeProduct = () => {
    return (
        <div className="h-screen pt-[80px] px-8 grid grid-cols-6 gap-12 ">
            <div className="">
                <Category></Category>
            </div>
            <div className="col-span-5">
                <Filter customFilter="ml-[50px]"></Filter>
                <Products></Products>
            </div>
        </div>
    );
};

export default HomeProduct;
