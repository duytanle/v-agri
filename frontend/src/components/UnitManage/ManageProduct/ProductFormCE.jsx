import React, { useState, useEffect } from "react";
import Input from "../../CustomForm/Input";
import Dropdown from "../../CustomForm/Dropdown";
import ProductDescSlider from "../../ProductDetail/ProductDescSlider";
import Checkbox from "../../CustomForm/Checkbox";
import EmployeeAvatar from "../Employees/EmployeeAvatar";
import { useSelector } from "react-redux";

const ProductCE = ({
    control,
    errors,
    setValue,
    register,
    checkImageProduct,
    setCheckImageProduct,
    resetForm,
    watch,
}) => {
    const { category } = useSelector((state) => state.product);
    const [imageVerify, setImageVerify] = useState([]);
    const [fileImageVerify, setFileImageVerify] = useState([]);
    const [fileImageDesc, setFileImageDesc] = useState([]);
    const dropdownCategory = [
        {
            name: "Chọn danh mục",
            value: "default",
        },
        ...category.map((item) => {
            return { name: item.DMSP_TenDanhMuc, value: item.DMSP_MaDMSP };
        }),
    ];
    const dropdownProductAbilityUnit = [
        { name: "Chọn đơn vị ", value: "default" },
        ...[].concat(
            ...category
                .filter((item) => watch("productCategory") === item.DMSP_MaDMSP)
                .map((item) => {
                    const DVT = item.DMSP_DonViTinh.split(", ");
                    return DVT.map((dvt) => {
                        return { name: dvt, value: dvt };
                    });
                })
        ),
    ];

    const dropdownProductPriceUnit =
        watch("productAbilityUnit")?.trim() === "tấn"
            ? [
                  { name: "Chọn đơn vị ", value: "default" },
                  { name: "kg", value: "kg" },
                  { name: "tấn", value: "tấn" },
                  ,
              ]
            : [
                  { name: "Chọn đơn vị ", value: "default" },
                  ...dropdownProductAbilityUnit.filter(
                      (item) =>
                          item.value === watch("productAbilityUnit") &&
                          item.value !== "default"
                  ),
              ];

    const [imageData, setImageData] = useState([
        {
            id: "default",
            url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678977390/coobus/no-intro_s0lnmn.png",
        },
    ]);
    const deleteImage = (id) => {
        const newImageData = imageData.filter((item) => item.id !== id);
        setImageData(newImageData);
        fileImageDesc.splice(id - 1, 1);
        setFileImageDesc(fileImageDesc);
        setValue("productImageDesc", fileImageDesc);
    };

    const handleImageDesc = (event) => {
        const listFile = [...event.target.files];
        const convertToArray = listFile.map((file, index) => {
            return {
                id: imageData.length + index,
                url: URL.createObjectURL(file),
                file: file,
            };
        });
        setFileImageDesc([...fileImageDesc, ...listFile]);
        setValue("productImageDesc", [...fileImageDesc, ...listFile]);
        setImageData([...imageData, ...convertToArray]);
    };

    const handleViewImageVerify = (event) => {
        const listFile = [...event.target.files];
        setFileImageVerify([...fileImageVerify, ...listFile]);
        setValue("productImageVerify", [...fileImageVerify, ...listFile]);
        setValue;
        const convertToArray = listFile.map((file, index) => {
            return { id: imageData + index, url: URL.createObjectURL(file) };
        });
        setImageVerify([...imageVerify, ...convertToArray]);
    };

    useEffect(() => {
        if (imageData.length > 1) {
            imageData.map((image) => {
                if (image.id !== 1) {
                    URL.revokeObjectURL(image.url);
                }
            });
            setImageData([
                {
                    id: "default",
                    url: "https://res.cloudinary.com/dszjsaro8/image/upload/v1678977390/coobus/no-intro_s0lnmn.png",
                },
            ]);
        }

        if (imageVerify.length > 0) {
            imageVerify.map((image) => {
                URL.revokeObjectURL(image.url);
            });
            setImageVerify([]);
        }
    }, [resetForm]);
    useEffect(() => {
        setValue("productAbilityUnit", "default");
    }, [watch("productCategory")]);
    return (
        <>
            <div className="manage-product-info mt-5">
                <div className="manage-product-name text-center">
                    <Input
                        control={control}
                        name="productName"
                        id="productName"
                        placeholder="Nhập tên sản phẩm"
                        customClass={
                            "border-b-2 border-b-primary-color p-2 font-bold text-3xl w-[90%] text-center"
                        }
                    ></Input>
                    {errors.productName ? (
                        <p className="text-red-700 text-sm">
                            {errors.productName.message}
                        </p>
                    ) : null}
                </div>

                <div className="manage-product-card h-[80%] grid grid-cols-12  mt-2">
                    <div className="productImage col-span-4 flex flex-col items-center ">
                        <EmployeeAvatar
                            control={control}
                            setValue={setValue}
                            name="productImage"
                            id="productImage"
                            customClass={`unit-logo col-span-4 h-[300px] w-[300px] shrink-0 p-4 ${
                                Object.keys(errors).length > 0
                                    ? "mt-5"
                                    : "my-auto"
                            }`}
                            defaultAvatar="https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                            setCheckImageProduct={setCheckImageProduct}
                        ></EmployeeAvatar>
                        <div className=" mt-4">
                            {checkImageProduct ? (
                                <div className="text-red-700 text-center">
                                    Vui lòng chọn hình ảnh cho sản phẩm
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div
                        className={` max-w-[700px] col-span-8 ${
                            Object.keys(errors).length > 0
                                ? "[&>*]:my-4"
                                : "[&>*]:my-6"
                        } `}
                    >
                        <div className="manage-product-category text-lg my-2 grid grid-cols-12 gap-x-2 gap-y-1 w-full last:my-0">
                            <label
                                htmlFor="productCategory"
                                className="font-bold col-span-3"
                            >
                                Thuộc danh mục:
                            </label>
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Danh mục sản phẩm"
                                dropdownData={dropdownCategory}
                                name="productCategory"
                                id="productCategory"
                                customTitle="w-[220px]  px-2 py-[2px] "
                                customClass="w-max col-span-9"
                                customListData="h-[200px] overflow-y-scroll"
                            ></Dropdown>
                            {errors.productCategory ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="text-red-700 text-sm col-span-9  ">
                                        {errors.productCategory.message}
                                    </p>
                                </>
                            ) : null}
                        </div>

                        <div className="manage-product-ability text-lg my-2 grid grid-cols-12 gap-3  w-full last:my-0 items-center">
                            <label
                                htmlFor="productAbility"
                                className="font-bold col-span-3"
                            >
                                Khả năng cung ứng:
                            </label>

                            <Input
                                control={control}
                                name="productAbility"
                                id="productAbility"
                                placeholder="30"
                                customClass="border-b-2 border-primary-color col-span-1 "
                            ></Input>

                            <Dropdown
                                control={control}
                                setValue={setValue}
                                name="productAbilityUnit"
                                id="productAbilityUnit"
                                labelDefault="Đơn vị tính"
                                customTitle="w-[130px] px-2 py-[2px]"
                                customClass="w-max col-span-3"
                                dropdownData={dropdownProductAbilityUnit}
                            ></Dropdown>

                            <span>/</span>

                            <Input
                                control={control}
                                name="productTimeApply"
                                id="productTimeApply"
                                placeholder="30"
                                customClass="border-b-2 border-primary-color col-span-1 "
                            ></Input>

                            <Dropdown
                                control={control}
                                setValue={setValue}
                                name="productTimeApplyUnit"
                                id="productTimeApplyUnit"
                                labelDefault="Thời hạn"
                                customTitle="w-[150px] px-2 py-[2px] "
                                customClass="w-max col-span-3"
                                dropdownData={[
                                    { name: "Chọn thời hạn", value: "default" },
                                    { name: "ngày", value: "ngày" },
                                    { name: "tháng", value: "tháng" },
                                    { name: "năm", value: "năm" },
                                ]}
                            ></Dropdown>

                            {errors.productAbility ||
                            errors.productAbilityUnit ||
                            errors.productTimeApply ||
                            errors.productTimeApplyUnit ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="text-red-700 text-sm col-span-9">
                                        {errors.productAbility?.message ||
                                            errors.productAbilityUnit
                                                ?.message ||
                                            errors.productTimeApply?.message ||
                                            errors.productTimeApplyUnit
                                                ?.message}
                                    </p>
                                </>
                            ) : null}
                        </div>

                        <div className="manage-product-price text-lg my-2 grid grid-cols-12 gap-3  w-full last:my-0 items-center">
                            <label
                                htmlFor="productPrice"
                                className="font-bold col-span-3"
                            >
                                Đơn giá:
                            </label>

                            <Input
                                control={control}
                                name="productPrice"
                                id="productPrice"
                                placeholder="30"
                                customClass="border-b-2 border-primary-color col-span-3 "
                            ></Input>

                            <span className="ml-5">/</span>

                            <div className="col-span-1">1</div>

                            <Dropdown
                                control={control}
                                setValue={setValue}
                                name="productPriceUnit"
                                id="productPriceUnit"
                                labelDefault="Đơn vị tính"
                                customTitle="w-[130px] px-2 py-[2px]"
                                customClass="w-max col-span-3"
                                dropdownData={dropdownProductPriceUnit}
                            ></Dropdown>

                            {errors.productPrice || errors.productPriceUnit ? (
                                <>
                                    <p className="col-span-3"></p>
                                    <p className="text-red-700 text-sm col-span-9">
                                        {errors.productPrice?.message ||
                                            errors.productPriceUnit?.message}
                                    </p>
                                </>
                            ) : null}
                        </div>

                        <div className="manage-product-standard text-lg my-2 grid grid-cols-12 gap-x-2 gap-y-1 w-full last:my-0 items-center">
                            <label
                                htmlFor="productStandard"
                                className="font-bold col-span-3"
                            >
                                Đạt chuẩn:
                            </label>
                            <Checkbox
                                control={control}
                                label="OCOP"
                                name="OCOP"
                                id="OCOP"
                                value="OCOP"
                                customCheckbox="col-span-2"
                            ></Checkbox>
                            <Checkbox
                                control={control}
                                label="VietGAP"
                                name="VG"
                                id="VG"
                                value="VG"
                                customCheckbox="col-span-2 "
                            ></Checkbox>
                            <Checkbox
                                control={control}
                                label="GlobalGAP"
                                name="GBG"
                                id="GBG"
                                value="GBG"
                                customCheckbox="col-span-2"
                            ></Checkbox>
                            <div className="standard-image col-span-12 grid grid-cols-12 my-3">
                                <div className="col-span-3"></div>
                                <div className="col-span-9 flex gap-10">
                                    {imageVerify.length > 0
                                        ? imageVerify.map((image, index) => (
                                              <div
                                                  className="w-[100px] h-[100px] border-2 border-primary-color rounded-xl p-1 relative"
                                                  key={index}
                                              >
                                                  <img
                                                      src={image.url}
                                                      alt=""
                                                      className="w-full h-full object-cover rounded-xl"
                                                  />
                                                  <div
                                                      className="absolute w-5 h5 top-1 right-1 cursor-pointer"
                                                      onClick={() => {
                                                          setImageVerify(
                                                              imageVerify.filter(
                                                                  (item) =>
                                                                      item.url !==
                                                                      image.url
                                                              )
                                                          );
                                                          fileImageVerify.splice(
                                                              index,
                                                              1
                                                          );
                                                          setFileImageVerify(
                                                              fileImageVerify
                                                          );
                                                          setValue(
                                                              "productImageVerify",
                                                              fileImageVerify
                                                          );
                                                      }}
                                                  >
                                                      <i className="fa-solid fa-trash"></i>
                                                  </div>
                                              </div>
                                          ))
                                        : null}
                                </div>
                                <div className="col-span-3"></div>
                                <div className="col-span-9">
                                    <label>
                                        <div className="bg-primary-color rounded-lg p-2 text-white font-bold  text-base w-max my-3">
                                            Tải minh chứng
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/jpeg, image/jpg, image/png"
                                            onChange={handleViewImageVerify}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-product-desc grid grid-cols-12 my-5">
                <div className="col-span-6">
                    <div className="mb-5 font-bold">Ảnh minh họa</div>
                    <div className="flex flex-col items-center">
                        <ProductDescSlider
                            imageData={
                                imageData.length === 1
                                    ? imageData
                                    : imageData.filter(
                                          (item) => item.id !== "default"
                                      )
                            }
                            customClass="w-[75%] h-[350px]"
                            edit={true}
                            deleteImage={deleteImage}
                        ></ProductDescSlider>
                        <label className="choose-image text-center mt-[50px] cursor-pointer">
                            <div className="bg-primary-color rounded-lg p-2 text-white font-bold  ">
                                Chọn ảnh
                            </div>
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                className="hidden"
                                multiple
                                onChange={handleImageDesc}
                            />
                        </label>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col gap-5 h-[350px]">
                    <label htmlFor="productDesc" className="font-bold">
                        Mô tả sản phẩm:
                    </label>
                    <textarea
                        {...register("productDesc")}
                        name="productDesc"
                        id="productDesc"
                        rows="30"
                        className="w-full min-h-[350px] border-2 border-primary-color outline-none rounded-xl p-2 resize-none"
                    ></textarea>
                    {errors.productDesc ? (
                        <>
                            <p className="text-red-700 text-sm ">
                                {errors.productDesc.message}
                            </p>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ProductCE;
