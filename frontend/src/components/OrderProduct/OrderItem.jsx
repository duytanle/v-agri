import React, { useEffect, useState } from "react";
import Modal from "../Portal/Modal";
import { useDispatch, useSelector } from "react-redux";
import ProductFormOrder from "../ProductDetail/ProductFormOrder";
import { dnUpdateTotalOrder } from "../../store/dn/dn-slice";
import OrderEditShip from "./OrderEditShip";
const OrderItem = ({ edit = false, data, ...props }) => {
    const [modal, showModal] = useState(false);
    const { products } = useSelector((state) => state.product);
    const [product] = products.filter((item) => item.SP_MaSP === data.SP_MaSP);
    const dispatch = useDispatch();
    const timesReceiving = () => {
        const orderTime = data.GH_ThoiHan.split(" ");
        const cycleReceiving = data.GH_ChuKyNhan.split(" ");
        switch (orderTime[1]) {
            case "năm": {
                if (cycleReceiving[1] === "năm")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );

                if (cycleReceiving[1] === "tháng")
                    return (
                        (parseFloat(orderTime[0]) * 12) /
                        parseFloat(cycleReceiving[0])
                    );
                if (cycleReceiving[1] === "ngày")
                    return (
                        (parseFloat(orderTime[0]) * 365) /
                        parseFloat(cycleReceiving[0])
                    );
                break;
            }
            case "tháng": {
                if (cycleReceiving[1] === "tháng")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );
                if (cycleReceiving[1] === "ngày")
                    return (
                        (parseFloat(orderTime[0]) * 30) /
                        parseFloat(cycleReceiving[0])
                    );
                break;
            }
            case "ngày": {
                if (cycleReceiving[1] === "ngày")
                    return (
                        parseFloat(orderTime[0]) / parseFloat(cycleReceiving[0])
                    );
                break;
            }
        }
    };
    const checkKM = () => {
        if (!data.KM_MaKM) {
            return 1;
        } else {
            const startDate = data.KM_NgayBatDau?.split("/") || "";
            const newStartDate = new Date(
                startDate[1] + "/" + startDate[0] + "/" + startDate[2]
            );
            const endDate = data.KM_NgayKetThuc?.split("/") || "";
            const newEndDate = new Date(
                endDate[1] + "/" + endDate[0] + "/" + endDate[2]
            );
            if (newStartDate <= new Date() && new Date() <= newEndDate) {
                return data.KM_PhanTram ? (100 - data.KM_PhanTram) / 100 : 1;
            } else {
                return 1;
            }
        }
    };
    const calculatePrice = () => {
        const times = Math.floor(timesReceiving());
        const soluong = data.GH_SoLuong.split(" ");
        const phanTram = data.KM_PhanTram;
        const phanTramString = phanTram ? ` * ${100 - phanTram}%` : ``;
        let price = 1;
        if (data.GSP_DonViTinh !== soluong[1]) {
            if (soluong[1] === "kg") {
                price = (
                    ((parseFloat(soluong[0]) * data.GSP_Gia) / 1000) *
                    times *
                    checkKM()
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) / 1000 * ${
                    data.GSP_Gia
                }  (1 ${data.GSP_DonViTinh})  ${
                    checkKM() === 1 ? "" : `${phanTramString}`
                } * ${times} (số lần nhận) = ${price} đồng`;
            } else {
                price = (
                    parseFloat(soluong[0]) *
                    data.GSP_Gia *
                    1000 *
                    times *
                    checkKM()
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) * 1000 * ${
                    data.GSP_Gia
                }  ${
                    checkKM() === 1 ? "" : `${phanTramString}`
                } * ${times} (số lần nhận) = ${price} đồng`;
            }
        } else {
            price = (parseFloat(soluong[0]) * data.GSP_Gia * times * checkKM())
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

            return `${soluong[0]} (${soluong[1]}) * ${data.GSP_Gia}  (1 ${
                data.GSP_DonViTinh
            })  ${
                checkKM() === 1 ? "" : `${phanTramString}`
            } * ${times} (số lần nhận) = ${price} đồng`;
        }
    };
    useEffect(() => {
        if (props.type === "order") {
            const price = calculatePrice().split(" ");
            const total = price[price.length - 2].replaceAll(".", "");
            props.setOrderPrice((prev) => [...prev, parseInt(total)]);
            props.setPayPrice(
                (prev) => prev + Math.ceil(parseInt(total) / timesReceiving())
            );
            dispatch(dnUpdateTotalOrder(parseInt(total)));
        }
    }, []);
    const updateSelectedItem = (event) => {
        if (event.target.checked) {
            props.setSelectedItem([...props.selectedItem, data.SP_MaSP]);
        } else {
            const indexItem = props.selectedItem.indexOf(data.SP_MaSP);
            if (indexItem > -1) {
                props.selectedItem.splice(indexItem, 1);
                props.setSelectedItem(props.selectedItem);
            }
        }
    };
    return (
        <div className="order-item relative w-full flex items-center gap-4 box-shadow-custom rounded-lg px-4 py-3 mb-4 ">
            {edit ? (
                <input
                    type="checkbox"
                    name="chooseItem"
                    id="ChooseItem"
                    className="cursor-pointer w-5 h-5 accent-primary-color"
                    onChange={updateSelectedItem}
                />
            ) : null}
            <div className="product-img w-[100px] h-[100px] rounded-lg overflow-hidden">
                <img
                    src={data.SP_AnhDaiDien}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="product-info-order flex-1 relative">
                <div className="name text-lg font-bold mb-2">
                    {data.SP_TenSanPham}
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <div className="price mb-1">
                            <span className="price-title font-bold">
                                Đơn giá:&nbsp;
                            </span>
                            <span className="price-number">
                                {data.GSP_Gia}&nbsp;/&nbsp;
                                {data.GSP_DonViTinh}
                            </span>
                        </div>
                        <div className="amount">
                            <span className="amount-title font-bold">
                                Số lượng đặt:&nbsp;
                            </span>
                            <span className="amount-number">
                                {data.GH_SoLuong}&nbsp;/&nbsp;
                                {data.GH_ChuKyNhan}
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="time mb-1">
                            <span className="time-title font-bold">
                                Thời hạn đơn hàng:&nbsp;
                            </span>
                            <span className="time-number">
                                {data.GH_ThoiHan}
                            </span>
                        </div>
                        <div className="date">
                            <span className="date-title font-bold">
                                Ngày bắt đầu nhận hàng:&nbsp;
                            </span>
                            <span className="date-number">
                                {data.GH_NgayNhan.split("-")
                                    .reverse()
                                    .join("-")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="notice font-bold mt-1">
                    <span>Thành tiền:&nbsp;</span>
                    <span className="text-red-700">{calculatePrice()}</span>
                </div>
                {edit ? (
                    <>
                        <div
                            className="absolute -top-2 -right-2 w-5 h-5 cursor-pointer"
                            onClick={() => showModal(true)}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <Modal
                            onClose={() => showModal(false)}
                            visible={modal}
                            bodyClassName="z-10 bg-white rounded-lg max-w-[900px] w-full h-[450px] py-5 px-8"
                        >
                            <div className="grid grid-cols-12 relative">
                                <div className="col-span-12 text-center font-bold text-3xl">
                                    {data.SP_TenSanPham}
                                </div>
                                <div className="col-span-12 grid grid-cols-12 gap-4 pt-10">
                                    <div className="info-img col-span-4 relative p-4 w-full h-[280px] ">
                                        <img
                                            src={data?.SP_AnhDaiDien}
                                            alt=""
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="col-span-8 ">
                                        <div className="max-w-[450px] ml-auto ">
                                            <ProductFormOrder
                                                edit={true}
                                                dataEdit={{
                                                    ...data,
                                                    GSP_DonViTinh:
                                                        data.GSP_DonViTinh,
                                                    SP_SoLuongCungCau:
                                                        data.SP_SoLuongCungCau.split(
                                                            " "
                                                        )[1],
                                                    SP_MaSP: data.SP_MaSP,
                                                }}
                                            ></ProductFormOrder>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute w-10 h-10 bg-secondary-color -top-1 -right-5 rounded-full p-1 text-lg font-bold text-white flex justify-center items-center cursor-pointer"
                                    onClick={() => showModal(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </Modal>
                    </>
                ) : null}
            </div>
            {props.type === "order" ? (
                <>
                    <div className="address-list absolute left-[105%] -top-0 w-1/2 ">
                        <div className="info-products-order relative mx-auto box-shadow-custom px-2 pt-1 pb-4 rounded-md">
                            <div
                                className="absolute cursor-pointer top-[10px] -right-2 w-8 h-8"
                                onClick={() => showModal(true)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className="item-name text-lg font-bold my-2">
                                <span>Thông Tin Giao Hàng</span>
                            </div>

                            <div className="flex justify-between my-1">
                                <div className="item-phone">
                                    <img
                                        src="/images/phone.png"
                                        alt=""
                                        className="w-5 h-5 inline-block mr-1"
                                    />
                                    <span>{props.ship?.shipPhone}</span>
                                </div>
                            </div>
                            <div className="item-address">
                                <span className="text-red-700 font-bold">
                                    Địa chỉ giao hàng:{" "}
                                </span>
                                <span>{props.ship?.shipAddress}</span>
                            </div>
                        </div>
                    </div>
                    <OrderEditShip
                        modal={modal}
                        showModal={showModal}
                        infoShip={props.infoShip}
                        setInfoShip={props.setInfoShip}
                        index={props.index}
                    ></OrderEditShip>
                </>
            ) : null}
        </div>
    );
};

export default OrderItem;
