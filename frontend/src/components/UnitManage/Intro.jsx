import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../HomeProduct/Products/Product";
const Intro = () => {
    const { user } = useSelector((state) => state.auth);
    const { intro } = useSelector((state) => state.dn);
    const navigate = useNavigate();
    const groupProduct = () => {
        let result = [];
        intro.map((item, index) => {
            if (result.length === 0) {
                result.push({ [item.SP_MaSP]: [item] });
            } else {
                let i;
                for (i = 0; i < result.length; ++i) {
                    const keyRE = Object.keys(result[i])[0];
                    if (keyRE === item.SP_MaSP) {
                        result[i][keyRE] = [...result[i][keyRE], item];
                        break;
                    }
                }
                if (i === result.length) {
                    result.push({ [item.SP_MaSP]: [item] });
                }
            }
        });
        return result;
    };
    const handleViewIntro = (SP_MaSP) => {
        navigate(`/chi_tiet_san_pham/${SP_MaSP}`);
    };
    return (
        <div className="manage-order h-full py-3 px-5 ">
            <div className=" font-bold text-2xl ">
                Quản lý danh sách chào hàng
            </div>
            {user.LND_MaLND === "DN" ? (
                <div className="h-[95%] overflow-y-scroll">
                    {/* group: [{SP_MaSP: [{},{}]}]  */}
                    {groupProduct().map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className=" mt-6 mb-4 mx-2 flex gap-5 items-center">
                                    <div className="logo w-10 h-10 border-[2px] border-primary-color rounded-full overflow-hidden">
                                        <img
                                            src={
                                                item[Object.keys(item)[0]][0]
                                                    .SP_AnhDaiDien
                                            }
                                            alt=""
                                            className="w-10 h-10 object-cover"
                                        />
                                    </div>
                                    <div className="text-lg font-bold">
                                        {
                                            item[Object.keys(item)[0]][0]
                                                .SP_TenSanPham
                                        }
                                    </div>
                                </div>
                                <div className="mx-auto flex gap-x-6 w-[85%] overflow-x-scroll pb-5">
                                    {item[Object.keys(item)[0]].map(
                                        (spgt, index) =>
                                            spgt.SPGT_DanhSach.map(
                                                (data, index) => (
                                                    <div
                                                        className="relative"
                                                        key={index}
                                                    >
                                                        <Product
                                                            data={data}
                                                            customProduct="max-w-[200px] min-w-[200px] h-[260px]"
                                                            onView={() =>
                                                                handleViewIntro(
                                                                    data.SP_MaSP
                                                                )
                                                            }
                                                        ></Product>
                                                    </div>
                                                )
                                            )
                                    )}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default Intro;
