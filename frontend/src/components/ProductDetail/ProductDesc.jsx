import React from "react";
import { useSelector } from "react-redux";
import ProductDescSlider from "./ProductDescSlider";
import "./ProductDetail.css";
const ProductDesc = () => {
    const { productDetail } = useSelector((state) => state.product);
    let imageArray = productDetail?.SP_AnhMoTa?.split(", ") || [""];
    let imageData =
        imageArray.length === 1 && imageArray[0] === ""
            ? [
                  {
                      id: 0,
                      url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678977390/coobus/no-intro_s0lnmn.png",
                  },
              ]
            : imageArray.map((item, index) => ({ id: index, url: item }));
    return (
        <div className="box-shadow-custom h-full max-h-full rounded-md py-3 px-4 overflow-hidden">
            <div className="title text-xl font-bold">
                Mô tả thông tin sản phẩm
            </div>
            <ProductDescSlider
                imageData={imageData}
                customClass="w-[620px] h-[480px] mx-auto my-5"
            ></ProductDescSlider>
            <div className="desc pt-10 text-justify">
                {productDetail?.SP_MoTa}
            </div>
        </div>
    );
};

export default ProductDesc;
