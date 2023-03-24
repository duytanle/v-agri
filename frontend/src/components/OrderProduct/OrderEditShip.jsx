import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Portal/Modal";
import Radio from "../CustomForm/Radio";
import Dropdown from "../CustomForm/Dropdown";
import { useSelector } from "react-redux";
import Input from "../CustomForm/Input";
const OrderEditShip = ({
    modal,
    showModal,
    infoShip,
    setInfoShip,
    ...props
}) => {
    const { province, district, commune } = useSelector(
        (state) => state.address
    );
    const { userUnit } = useSelector((state) => state.auth);
    const dropdownDataProvince = [
        { value: "default", name: "Chọn tỉnh thành" },
        ...province.map((item) => {
            return { value: item.TT_MaTT, name: item.TT_TenTinhThanh };
        }),
    ];

    const validation = yup.object({
        typeShip: yup
            .string()
            .oneOf(
                ["default", "reuse", "new"],
                "Vui lòng chọn thông tin giao hàng"
            ),
    });
    const {
        control,
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: { typeShip: "" },
        resolver: yupResolver(validation),
    });
    const watchTS = useWatch({ control, name: "typeShip", value: "" });

    const watchTT = useWatch({
        control,
        name: "shipProvince",
        defaultValue: "default",
    });
    const watchQH = useWatch({
        control,
        name: "shipDistrict",
        defaultValue: "default",
    });
    const dropdownDataDistrict = [
        { value: "default", name: "Chọn quận huyện" },
        ...district
            .filter((item) => item.TT_MaTT === watchTT)
            .map((item) => {
                return { value: item.QH_MaQH, name: item.QH_TenQuanHuyen };
            }),
    ];
    const dropdownDataCommune = [
        { value: "default", name: "Chọn xã phường" },
        ...commune
            .filter((item) => item.QH_MaQH === watchQH)
            .map((item) => {
                return { value: item.XP_MaXP, name: item.XP_TenXaPhuong };
            }),
    ];
    const handleUpdate = async (values) => {
        if (values.typeShip === "") {
            setError("typeShip", {
                message: "Vui lòng chọn loại thông tin giao hàng",
            });
        }
        if (values.typeShip === "reuse" && values.reuseOrder === "default") {
            setError("reuseOrder", {
                message: "Vui lòng chọn thông tin giao hàng",
            });
        }
        if (values.typeShip === "reuse" && values.reuseOrder === "no") {
            setError("reuseOrder", {
                message: "Vui lòng chọn lại loại thông tin giao hàng",
            });
        }
        if (watchTS === "new") {
            const checkAddress = [
                {
                    name: "shipProvince",
                    value: values.shipProvince,
                    error: "Chọn tỉnh thành",
                },
                {
                    name: "shipDistrict",
                    value: values.shipDistrict,
                    error: "Chọn quận huyện",
                },
                {
                    name: "shipCommune",
                    value: values.shipCommune,
                    error: "Chọn xã phường",
                },
            ];
            checkAddress.forEach((address) => {
                if (address.value === "default") {
                    setError(address.name, { message: address.error });
                }
            });
            if (values.shipAddress === "") {
                setError("shipAddress", { message: "Vui lòng nhập địa chỉ " });
            }
            if (values.shipPhone === "") {
                setError("shipPhone", {
                    message: "Vui lòng nhập số điện thoại",
                });
            }
        }
        if (
            !errors?.shipProvince &&
            !errors?.shipDistrict &&
            !errors?.shipCommune &&
            !errors?.shipAddress &&
            !errors?.shipPhone &&
            !errors?.reuseOrder
        ) {
            switch (values.typeShip) {
                case "default": {
                    const newArray = JSON.parse(JSON.stringify(infoShip));
                    const newInfoShip = {
                        shipPhone: userUnit.DV_DienThoai,
                        shipAddress: userUnit.DV_DiaChi,
                        shipDCCT: "",
                        shipMaXP: "",
                        shipReuse: "",
                    };
                    newArray.splice(props.index, 1, newInfoShip);
                    setInfoShip(newArray);
                    break;
                }
                case "reuse": {
                    const newArray = JSON.parse(JSON.stringify(infoShip));
                    const newInfoShip = JSON.parse(
                        JSON.stringify(
                            newArray[parseInt(values.reuseOrder) - 1]
                        )
                    );
                    newInfoShip.shipReuse = parseInt(values.reuseOrder) - 1;
                    newArray.splice(props.index, 1, newInfoShip);
                    setInfoShip(newArray);
                    break;
                }
                case "new": {
                    const xa = commune.find(
                        (item) => item.XP_MaXP === values.shipCommune
                    );

                    const huyen = district.find(
                        (item) => item.QH_MaQH === values.shipDistrict
                    );
                    const tinh = province.find(
                        (item) => item.TT_MaTT === values.shipProvince
                    );
                    const newInfoShip = {
                        shipPhone: values.shipPhone,
                        shipAddress: `${values.shipAddress}, ${xa?.XP_TenXaPhuong},${huyen?.QH_TenQuanHuyen}, ${tinh?.TT_TenTinhThanh}`,
                        shipDCCT: values.shipAddress,
                        shipMaXP: values.shipCommune,
                        shipMaDCCT: "",
                        shipReuse: "",
                    };
                    const newArray = JSON.parse(JSON.stringify(infoShip));
                    newArray.splice(props.index, 1, newInfoShip);
                    setInfoShip(newArray);
                    break;
                }
            }
        }
    };
    useEffect(() => {
        if (watchTT) {
            setValue("shipDistrict", "default");
        }
    }, [watchTT]);
    useEffect(() => {
        if (watchQH) {
            setValue("shipCommune", "default");
        }
    }, [watchQH]);
    return (
        <Modal
            onClose={() => showModal(false)}
            visible={modal}
            bodyClassName="z-10 bg-white rounded-lg max-w-[800px] w-full h-max py-5 px-8"
        >
            <div className="w-full text-center font-bold text-2xl">
                Điều chỉnh thông tin giao hàng
            </div>
            <form className="radio-info-ship pt-5 w-full ">
                <div className="use-info grid grid-cols-12 items-center w-full ">
                    <label
                        htmlFor="type-info-ship "
                        className="col-span-4 font-bold"
                    >
                        Sử dụng thông tin giao hàng :
                    </label>
                    <div className="w-full col-span-8 grid grid-cols-12 items-center">
                        <div className="col-span-3 flex gap-2 items-center">
                            <Radio
                                control={control}
                                id="default"
                                name="typeShip"
                                value="default"
                            ></Radio>
                            <span className="flex-1">Mặc định</span>
                        </div>
                        <div className="col-span-5 flex gap-2 items-center ml-auto">
                            <Radio
                                control={control}
                                id="reuse"
                                name="typeShip"
                                value="reuse"
                            ></Radio>
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Sử dụng thông tin"
                                id="reuseOrder"
                                name="reuseOrder"
                                customTitle="p-1"
                                customClass="w-[170px]"
                                dropdownData={[
                                    {
                                        name: "Chọn thông tin",
                                        value: "default",
                                    },
                                    ...infoShip.map((item, index) => {
                                        if (props.index !== index) {
                                            return {
                                                name: `Đơn hàng số ${
                                                    index + 1
                                                }`,
                                                value: index + 1,
                                            };
                                        } else
                                            return {
                                                name: "Không có đơn khác",
                                                value: "no",
                                            };
                                    }),
                                ]}
                            ></Dropdown>
                        </div>
                        <div className="col-span-4 flex gap-2 items-center ml-10">
                            <Radio
                                control={control}
                                id="new"
                                name="typeShip"
                                value="new"
                            ></Radio>
                            <span>Tạo mới</span>
                        </div>
                    </div>
                    {errors?.typeShip || errors?.reuseOrder ? (
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-4"></div>
                            <div className="col-span-5 text-md text-secondary-color mt-1">
                                {errors?.typeShip?.message ||
                                    errors?.reuseOrder?.message}
                            </div>
                        </div>
                    ) : null}
                </div>
                {watchTS === "new" ? (
                    <div className="unit-address my-3 grid grid-cols-12 items-center gap-2">
                        <div className="col-span-6 flex gap-[42px] items-center mt-5">
                            <label htmlFor="shipPhone" className="font-bold">
                                Điện thoại:
                            </label>
                            <Input
                                type="text"
                                control={control}
                                name="shipPhone"
                                id="shipPhone"
                                placeholder="Điện thoại liên hệ"
                                customClass="border-b-2 border-primary-color col-span-8"
                            ></Input>
                            {errors.shipPhone ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.shipPhone.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        <div className="col-span-12 grid grid-cols-12 items-center my-2">
                            <label htmlFor="" className="font-bold col-span-2">
                                Địa chỉ:
                            </label>
                            <div className="col-span-10">
                                <Input
                                    type="text"
                                    control={control}
                                    name="shipAddress"
                                    id="shipAddress"
                                    placeholder="Địa chỉ cụ thể:"
                                    customClass="border-b-2 border-primary-color w-full p-1"
                                ></Input>
                                {errors.shipAddress ? (
                                    <p className="text-red-700 text-sm col-span-12">
                                        {errors.shipAddress.message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-span-4 mt-2">
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Tỉnh Thành"
                                customTitle="p-1"
                                customClass="col-span-4"
                                customListData="h-[200px] overflow-y-scroll"
                                dropdownData={dropdownDataProvince}
                                name="shipProvince"
                                id="shipProvince"
                            ></Dropdown>
                            {errors.shipProvince ? (
                                <>
                                    <p className="col-span-4"></p>
                                    <p className="text-red-700 text-sm col-span-8">
                                        {errors.shipProvince.message}
                                    </p>
                                </>
                            ) : null}
                        </div>

                        <div className="col-span-4 mt-2">
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Quận huyện"
                                customTitle="p-1 "
                                customClass="col-span-6 w-[240px] "
                                customListData="h-[200px] overflow-y-scroll"
                                dropdownData={dropdownDataDistrict}
                                name="shipDistrict"
                                id="shipDistrict"
                            ></Dropdown>
                            {errors.shipDistrict ? (
                                <p className="text-red-700 text-sm col-span-6">
                                    {errors.shipDistrict.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="col-span-4 mt-2">
                            <Dropdown
                                control={control}
                                setValue={setValue}
                                labelDefault="Xã phường"
                                customTitle="p-1 "
                                customClass="col-span-6"
                                customListData="h-[200px] overflow-y-scroll"
                                dropdownData={dropdownDataCommune}
                                name="shipCommune"
                                id="shipCommune"
                            ></Dropdown>

                            {errors.shipCommune ? (
                                <p className="text-red-700 text-sm ">
                                    {errors.shipCommune.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : null}
                <div className="w-full">
                    <div
                        className="w-max bg-primary-color py-2 px-3 text-white font-bold text-lg rounded-lg text-center mx-auto mt-10 cursor-pointer hover:bg-hover-priColor"
                        onClick={handleSubmit(handleUpdate)}
                    >
                        Lưu thay đổi
                    </div>
                </div>
            </form>

            <div
                className="absolute top-3 right-3 bg-secondary-color w-10 h-10 p-1 flex justify-center items-center font-bold text-white text-lg rounded-full cursor-pointer hover:bg-hover-secColor"
                onClick={() => showModal(false)}
            >
                <i className="fa-solid fa-xmark"></i>
            </div>
        </Modal>
    );
};

export default OrderEditShip;
