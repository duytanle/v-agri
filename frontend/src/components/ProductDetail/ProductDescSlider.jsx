import React, { useState } from "react";
import "./ProductDetail.css";
const ProductDescSlider = ({
    imageData,
    customClass,
    edit = false,
    ...props
}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const isFirst = 0;
    const isLast = imageData.length - 1;
    const prevImage = () => {
        {
            currentImage === isFirst
                ? setCurrentImage(isLast)
                : setCurrentImage((prev) => prev - 1);
        }
    };
    const nextImage = () => {
        {
            currentImage === isLast
                ? setCurrentImage(isFirst)
                : setCurrentImage((prev) => prev + 1);
        }
    };
    const goToImage = (index) => {
        setCurrentImage(index);
    };
    return (
        <div
            className={`${
                !imageData || imageData.length < 0
                    ? "hidden"
                    : `slide-image relative  rounded-xl ${customClass} box-shadow-custom`
            }`}
        >
            <div className="w-full h-full relative">
                <img
                    src={`${imageData[currentImage]?.url}`}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                />
                {edit && imageData[0]?.id !== "default" ? (
                    <div
                        className="absolute top-2 right-2 w-7 h-7 cursor-pointer bg-white flex items-center justify-center rounded-full custom-box-shadow"
                        onClick={() => {
                            props.deleteImage(imageData[currentImage]?.id);
                            nextImage();
                        }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </div>
                ) : null}
            </div>
            <div
                className="left-image absolute top-1/2 left-3  -translate-y-1/2 rounded-full border-2 border-primary-color bg-white p-1  cursor-pointer"
                onClick={prevImage}
            >
                <img src="/images/arrow-left.png" alt="" className="w-6 h-6" />
            </div>
            <div
                className="right-image absolute top-1/2 right-3  -translate-y-1/2 rounded-full border-2 border-primary-color bg-white p-1  cursor-pointer"
                onClick={nextImage}
            >
                <img src="/images/arrow-right.png" alt="" className="w-6 h-6" />
            </div>
            <div className="dot flex gap-4 my-3 justify-center">
                {imageData.map((image, index) => (
                    <i
                        className={`${
                            index === currentImage ? "fa-solid" : "fa-regular"
                        } fa-circle cursor-pointer`}
                        key={image.id}
                        onClick={() => goToImage(index)}
                    ></i>
                ))}
            </div>
        </div>
    );
};

export default ProductDescSlider;
