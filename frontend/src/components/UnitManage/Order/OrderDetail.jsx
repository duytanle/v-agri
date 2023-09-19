import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../api/axios.js";
import { toast } from "react-toastify";
const OrderDetail = ({ data, setShowDetail }) => {
    console.log(data);
    const { user, accessToken, userUnit } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const timesReceiving = () => {
        const orderTime = data.CTDH_ThoiHan.split(" ");
        const cycleReceiving = data.CTDH_ChuKyNhan.split(" ");
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
    const calculatePrice = () => {
        const times = Math.floor(timesReceiving());
        const soluong = data.CTDH_SoLuong.split(" ");
        const phanTram = data.KM_PhanTram;
        const phanTramString = phanTram ? `*${100 - phanTram} %` : ``;
        let price = 1;
        if (data.GSP_DonViTinh !== soluong[1]) {
            if (soluong[1] === "kg") {
                price = (
                    ((parseFloat(soluong[0]) * data.GSP_Gia) / 1000) *
                    times *
                    (phanTram ? (100 - phanTram) / 100 : 1)
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) / 1000 * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
            } else {
                price = (
                    parseFloat(soluong[0]) *
                    data.GSP_Gia *
                    1000 *
                    times *
                    (phanTram ? (100 - phanTram) / 100 : 1)
                )
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                return `${soluong[0]} (${soluong[1]}) * 1000 * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
            }
        } else {
            price = (
                parseFloat(soluong[0]) *
                data.GSP_Gia *
                times *
                (phanTram ? (100 - phanTram) / 100 : 1)
            )
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

            return `${soluong[0]} (${soluong[1]}) * ${data.GSP_Gia}  (1 ${data.GSP_DonViTinh}) ${phanTramString} * ${times} (số lần nhận) = ${price} đồng`;
        }
    };

    const calculateNextShip =
        data.CTDH_GiaoHang?.split(", ")[0] === "null"
            ? 1
            : parseInt(data.CTDH_GiaoHang?.split(", ")[0]) + 1;

    const calculateNextDateShip = () => {
        let numberCycle = data.CTDH_ChuKyNhan?.split(" ")[0];
        let typeCycle = data.CTDH_ChuKyNhan?.split(" ")[1];
        let totalDateAdd = numberCycle * calculateNextShip;
        switch (typeCycle) {
            case "ngày": {
                break;
            }
            case "tháng": {
                totalDateAdd *= 30;
                break;
            }
            case "năm": {
                totalDateAdd *= 365;
            }
        }
        let result = new Date(data.CTDH_NgayNhan);
        result.setDate(result.getDate() + totalDateAdd);
        return result.toLocaleString("pt-PT").slice(0, 10);
    };
    const handleHTXConfirm = () => {
        dispatch({
            type: "HTX_CONFIRM_ORDER",
            payload: {
                token: accessToken,
                data: {
                    ND_MaND: user.ND_MaND,
                    SP_MaSP: data.SP_MaSP,
                    DH_MaDH: data.DH_MaDH,
                    PTTT_MaPTTT: data.PTTT_MaPTTT,
                },
            },
        });

        dispatch({
            type: "HTX_GET_ORDER",
            payload: { token: accessToken, DV_MaDV: userUnit.DV_MaDV },
        });
    };
    const handleHTXCancelOrder = () => {
        dispatch({
            type: "HTX_CANCEL_ORDER",
            payload: {
                token: accessToken,
                data: {
                    ND_MaND: user.ND_MaND,
                    SP_MaSP: data.SP_MaSP,
                    DH_MaDH: data.DH_MaDH,
                },
            },
        });
    };
    const handleHTXShipOrder = (event) => {
        event.preventDefault();
        dispatch({
            type: "HTX_SHIP_ORDER",
            payload: {
                token: accessToken,
                data: {
                    ND_MaND: user.ND_MaND,
                    SP_MaSP: data.SP_MaSP,
                    DH_MaDH: data.DH_MaDH,
                    CTDH_GiaoHang: data.CTDH_GiaoHang,
                },
            },
        });
    };
    const handleDNReceiveOrder = (event) => {
        event.preventDefault();
        dispatch({
            type: "DN_RECEIVE_ORDER",
            payload: {
                token: accessToken,
                data: {
                    ND_MaND: user.ND_MaND,
                    SP_MaSP: data.SP_MaSP,
                    DH_MaDH: data.DH_MaDH,
                    CTDH_GiaoHang: data.CTDH_GiaoHang,
                    CTDH_SoLanNhan: timesReceiving(),
                },
            },
        });
    };
    const handleCancel = async (values) => {
        const data = {
            SP_MaSP: values.SP_MaSP,
            DH_MaDH: values.DH_MaDH,
            LDV_MaLDV: userUnit.LDV_MaLDV,
        };
        const res = await axios.post("/common/request-cancel", data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    return (
        <div className="order-detail relative">
            <div className="order-name text-center">
                <span className="text-2xl  font-bold">
                    {data.SP_TenSanPham}
                </span>
            </div>
            <div className="order-info grid grid-cols-12 gap-x-8 gap-y-5 mt-2">
                <div className="col-span-3 h-[200px] my-auto">
                    <img
                        src={data.SP_AnhDaiDien}
                        alt=""
                        className="w-full h-full rounded-lg"
                    />
                </div>
                <div className="col-span-9 text-lg [&>*]:mb-2">
                    <div className="order-unit">
                        <span className="font-bold mr-1">Đơn vị:&nbsp;</span>
                        <span>{data.DV_TenDonVi}</span>
                    </div>
                    <div className="order-info">
                        <div className="title font-bold">
                            <span className="mr-1">
                                Thông tin đơn hàng:&nbsp;
                            </span>
                        </div>
                        <div className="order-detail ml-4 my-3 grid grid-cols-2 gap-x-3 gap-y-2 justify-between">
                            <div className="order-number col-span-1">
                                <span className="font-bold mr-1 ">
                                    Số lượng đặt hàng:&nbsp;
                                </span>
                                <span>
                                    {data.CTDH_SoLuong}&nbsp;/&nbsp;
                                    {data.CTDH_ChuKyNhan}
                                </span>
                            </div>
                            <div className="order-time col-span-1">
                                <span className="font-bold mr-1 ">
                                    Thời hạn đơn hàng:&nbsp;
                                </span>
                                <span>{data.CTDH_ThoiHan}</span>
                            </div>
                            <div className="order-price col-span-1">
                                <span className="font-bold mr-1 ">
                                    Giá sản phẩm:&nbsp;
                                </span>
                                <span>
                                    {data.GSP_Gia}&nbsp;/&nbsp;
                                    {data.GSP_DonViTinh}
                                </span>
                            </div>
                            <div className="order-sale col-span-1">
                                <span className="font-bold mr-1 ">
                                    Khuyến mãi:&nbsp;
                                </span>
                                <span>
                                    {data.KM_MaKM
                                        ? data.KM_PhanTram
                                        : "Không có"}
                                </span>
                            </div>

                            <div className="order-date col-span-1">
                                <span className="font-bold mr-1 ">
                                    Ngày đặt hàng:&nbsp;
                                </span>
                                <span>{data.DH_NgayDat}</span>
                            </div>
                            <div className="order-receive col-span-1">
                                <span className="font-bold mr-1 ">
                                    Ngày bắt đầu nhận hàng:&nbsp;
                                </span>
                                <span>
                                    {data.CTDH_NgayNhan.split("-")
                                        .reverse()
                                        .join("/")}
                                </span>
                            </div>
                            <div className="order-total col-span-2">
                                <span className="font-bold mr-1 ">
                                    Tổng giá trị:&nbsp;
                                </span>
                                <span className="text-primary-color font-bold">
                                    {calculatePrice()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="title font-bold text-lg">
                        <div className="">Trạng thái đơn hàng:</div>
                        {user.LND_MaLND === "DN" && (
                            <div className="text-secondary-color mt-3">
                                {data.TTDH_TenTrangThai}
                            </div>
                        )}
                        {user.LND_MaLND === "HTX" &&
                        data.TTDH_MaTTDH === "CXN" ? (
                            <div className="flex justify-between items-center mt-3">
                                <div
                                    className="bg-secondary-color rounded-lg text-white text-center px-3 py-1 cursor-pointer hover:bg-hover-secColor"
                                    onClick={handleHTXCancelOrder}
                                >
                                    Hủy đơn
                                </div>
                                <div
                                    className="bg-primary-color rounded-lg text-white text-center px-3 py-1 cursor-pointer hover:bg-hover-priColor"
                                    onClick={handleHTXConfirm}
                                >
                                    Xác nhận
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`text-primary-color mt-3 ${
                                    user.LND_MaLND === "DN" ? "hidden" : ""
                                }`}
                            >
                                {data.TTDH_TenTrangThai}
                            </div>
                        )}
                        {user.LND_MaLND === "DN" &&
                        data.TTDH_MaTTDH === "CTT" ? (
                            <button className="bg-primary-color mt-2 text-white px-4 py-2 rounded-lg hover:bg-hover-priColor">
                                Thanh toán
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="col-span-9 text-lg  [&>*]:mb-2 grid grid-cols-12 gap-8">
                    <div className="col-span-6">
                        <div className="title font-bold">
                            <span className="mr-1">
                                Liên hệ giao hàng:&nbsp;
                            </span>
                        </div>
                        <div className="order-detail mt-3 ml-4 my-1 flex flex-col gap-x-3 gap-y-2 justify-between">
                            <div className="order-phone col-span-2">
                                <span className="font-bold ">
                                    Số điện thoại:&nbsp;
                                </span>
                                <span>{data.CTDH_SoDienThoai}</span>
                            </div>
                            <div className="order-address col-span-2">
                                <span className="font-bold mr-1 ">
                                    Địa chỉ:&nbsp;
                                </span>
                                <span>
                                    {data.DCCT_TenDiaChi},&nbsp;
                                    {data.XP_TenXaPhuong},&nbsp;
                                    {data.QH_TenQuanHuyen},&nbsp;
                                    {data.TT_TenTinhThanh}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 flex flex-col gap-[10px]">
                        <p className="font-bold text-lg">Thông tin giao hàng</p>
                        {data.TTDH_MaTTDH !== "CXN" ? (
                            <>
                                <div>
                                    <span>Đã nhận:&nbsp;</span>
                                    <span>
                                        {data.CTDH_GiaoHang?.split(", ")[0] ||
                                            "0"}
                                        &nbsp;lần
                                    </span>
                                </div>
                                {data.TTDH_MaTTDH.search("DTH") > -1 ||
                                data.TTDH_MaTTDH === "CXN" ? (
                                    <div className="flex justify-between">
                                        <span>
                                            Giao hàng lần&nbsp;
                                            {calculateNextShip}
                                            :&nbsp;
                                        </span>
                                        <span>
                                            {data.CTDH_GiaoHang?.split(
                                                ", "
                                            )[1] === "giao"
                                                ? "Đã giao"
                                                : calculateNextDateShip()}
                                        </span>
                                    </div>
                                ) : null}

                                {data.TTDH_MaTTDH.search("DTH") > -1 ||
                                data.TTDH_MaTTDH === "CXN" ? (
                                    <div className="flex justify-between items-center">
                                        {user.LND_MaLND === "DN" &&
                                        data.CTDH_GiaoHang.split(", ")[2] ===
                                            "HUY" ? (
                                            <div className="min-w-[100px] bg-gray-200 text-gray-700 p-2  font-bold rounded-lg text-center ">
                                                Đã yêu cầu hủy
                                            </div>
                                        ) : user.LND_MaLND === "DN" &&
                                          data.CTDH_GiaoHang.split(", ")[3] ===
                                              "HUY" ? (
                                            <button
                                                className="min-w-[100px] bg-secondary-color p-2 text-white font-bold rounded-lg text-center cursor-pointer hover:bg-hover-secColor "
                                                onClick={() =>
                                                    handleConfirmCancel(data)
                                                }
                                            >
                                                Xác nhận hủy
                                            </button>
                                        ) : (
                                            user.LND_MaLND === "DN" && (
                                                <button
                                                    className="min-w-[100px] bg-secondary-color p-2 text-white font-bold rounded-lg text-center cursor-pointer hover:bg-hover-secColor "
                                                    onClick={() =>
                                                        handleCancel(data)
                                                    }
                                                >
                                                    Hủy
                                                </button>
                                            )
                                        )}
                                        {(user.LND_MaLND === "HTX" &&
                                            data.CTDH_GiaoHang.split(
                                                ", "
                                            )[3]) === "HUY" ? (
                                            <button className="min-w-[100px] bg-secondary-color p-2 text-white font-bold rounded-lg text-center  hover:bg-hover-secColor cursor-not-allowed">
                                                Đã yêu cầu hủy
                                            </button>
                                        ) : user.LND_MaLND === "HTX" &&
                                          data.CTDH_GiaoHang.split(", ")[2] ===
                                              "HUY" ? (
                                            <button
                                                className="min-w-[100px] bg-secondary-color p-2 text-white font-bold rounded-lg text-center cursor-pointer hover:bg-hover-secColor "
                                                onClick={() =>
                                                    handleConfirmCancel(data)
                                                }
                                            >
                                                Xác nhận hủy
                                            </button>
                                        ) : (
                                            user.LND_MaLND === "HTX" && (
                                                <button
                                                    className="min-w-[100px] bg-secondary-color p-2 text-white font-bold rounded-lg text-center cursor-pointer hover:bg-hover-secColor "
                                                    onClick={() =>
                                                        handleCancel(data)
                                                    }
                                                >
                                                    Hủy
                                                </button>
                                            )
                                        )}
                                        {user.LND_MaLND === "DN" ? (
                                            <button
                                                className={` p-2  font-bold rounded-lg   ${
                                                    data.CTDH_GiaoHang?.split(
                                                        ", "
                                                    )[1] !== "giao"
                                                        ? "cursor-not-allowed bg-gray-200 text-gray-700"
                                                        : "cursor-pointer bg-primary-color hover:bg-hover-priColor text-white"
                                                }  `}
                                                onClick={handleDNReceiveOrder}
                                            >
                                                Nhận hàng
                                            </button>
                                        ) : (
                                            <button
                                                className={` p-2  font-bold rounded-lg   ${
                                                    data.CTDH_GiaoHang?.split(
                                                        ", "
                                                    )[1] === "giao"
                                                        ? "cursor-not-allowed bg-gray-200 text-gray-700"
                                                        : "cursor-pointer bg-primary-color hover:bg-hover-priColor text-white"
                                                }  `}
                                                onClick={handleHTXShipOrder}
                                            >
                                                Giao hàng
                                            </button>
                                        )}
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <p>Chưa có thông tin</p>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="absolute -top-3 -right-3 p-1 flex justify-center items-center w-10 h-10 text-lg font-bold text-white bg-secondary-color rounded-full cursor-pointer hover:bg-hover-secColor"
                onClick={() => setShowDetail({})}
            >
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
};

export default OrderDetail;
