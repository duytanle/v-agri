import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dnUpdateOrderProduct } from "../../store/dn/dn-slice";
import OrderItem from "../OrderProduct/OrderItem";

const Cart = () => {
    const { cart, updateCartItem } = useSelector((state) => state.dn);
    const { accessToken } = useSelector((state) => state.auth);
    const [selectedItem, setSelectedItem] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = () => {
        const temp = [];
        cart.map((item) => {
            if (temp.length === 0) {
                temp.push({ [item.DV_MaDV]: [item] });
            } else {
                for (let i = 0; i < temp.length; ++i) {
                    const value = temp[i][item.DV_MaDV];
                    if (value) {
                        temp[i][item.DV_MaDV] = [...value, item];
                    } else {
                        temp.push({ [item.DV_MaDV]: [item] });
                    }
                }
            }
        });
        return temp;
    };
    const handleOrder = () => {
        if (selectedItem.length === 0) {
            toast.error("Vui lòng chọn sản phẩm để đặt hàng", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            let findEmptyTimeReceive = false;
            for (
                let i = 0;
                i < selectedItem.length && !findEmptyTimeReceive;
                ++i
            ) {
                const filterCart = cart.filter(
                    (item) =>
                        item.SP_MaSP === selectedItem[i] &&
                        item.GH_NgayNhan === ""
                );
                if (filterCart.length > 0) {
                    findEmptyTimeReceive = true;
                }
            }
            if (findEmptyTimeReceive) {
                toast.error("Vui lòng cập nhật ngày nhận hàng trước khi đặt", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                dispatch(dnUpdateOrderProduct({ orderProduct: selectedItem }));
                navigate("/dat_hang");
            }
        }
    };
    useEffect(() => {
        dispatch({ type: "GET_CART", payload: accessToken });
    }, [updateCartItem]);
    return (
        <div className="manage-order h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">Quản lý giỏ hàng</div>
            <div className="info-products-order w-[90%] mx-auto h-[540px] p-3 overflow-y-scroll">
                {/* {cart.map((item) => (
                    <OrderItem
                        edit={true}
                        data={item}
                        key={item.SP_MaSP}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    ></OrderItem>
                ))} */}
                {data().map((item) => {
                    return (
                        <>
                            <div
                                key={item[Object.keys(item)[0]][0].DV_TenDonVi}
                                className="mb-2 flex gap-5 items-center"
                            >
                                <div className="logo w-10 h-10 border-[2px] border-primary-color rounded-full overflow-hidden">
                                    <img
                                        src={
                                            item[Object.keys(item)[0]][0]
                                                .DV_Logo
                                        }
                                        alt=""
                                        className="w-10 h-10 object-cover"
                                    />
                                </div>
                                <div className="text-lg font-bold">
                                    {item[Object.keys(item)[0]][0].DV_TenDonVi}
                                </div>
                            </div>
                            <div className="ml-10">
                                {item[Object.keys(item)[0]].map((data) => (
                                    <OrderItem
                                        edit={true}
                                        data={data}
                                        key={item.SP_MaSP}
                                        selectedItem={selectedItem}
                                        setSelectedItem={setSelectedItem}
                                    ></OrderItem>
                                ))}
                            </div>
                        </>
                    );
                })}
            </div>
            <div className="w-full flex justify-center gap-10">
                <div className="bg-secondary-color px-4 py-2 rounded-lg font-bold text-lg text-center text-white hover:bg-hover-secColor cursor-pointer">
                    Xóa sản phẩm
                </div>
                <div
                    className="bg-primary-color px-4 py-2 rounded-lg font-bold text-lg text-center text-white w-[160px] hover:bg-hover-priColor cursor-pointer"
                    onClick={handleOrder}
                >
                    Đặt hàng
                </div>
            </div>
        </div>
    );
};

export default Cart;
