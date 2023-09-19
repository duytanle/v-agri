import {
    countData,
    getAllJoins,
    getAllRow,
    getByColumn,
    getDataCustom,
    getRowJoin,
    getRowJoins,
    postRow,
    updateRows,
} from "../services/db.js";

const qtvdbController = {
    getPaymentOnline: async (req, res) => {
        if (req.LND_MaLND !== "QLTC") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const order = await getRowJoins(
                    "don_hang",
                    [
                        {
                            table1: "don_hang",
                            table2: "qlv_doanh_nghiep",
                            fieldCon: "DN_MaQL",
                        },
                        {
                            table1: "qlv_doanh_nghiep",
                            table2: "don_vi",
                            fieldCon: "DV_MaDV",
                        },
                        {
                            table1: "don_vi",
                            table2: "thong_tin_thanh_toan",
                            fieldCon: "DV_MaDV",
                        },
                    ],
                    `PTTT_MaPTTT="ONLINE"`
                );
                let onlineOrderDetail = {};
                let orderDetail = [];
                if (order.length > 0) {
                    for (let i = 0; i < order.length; ++i) {
                        orderDetail = await getRowJoins(
                            "chi_tiet_don_hang",
                            [
                                {
                                    table1: "chi_tiet_don_hang",
                                    table2: "san_pham",
                                    fieldCon: "SP_MaSP",
                                },
                                {
                                    table1: "san_pham",
                                    table2: "don_vi",
                                    fieldCon: "DV_MaDV",
                                },
                                {
                                    table1: "don_vi",
                                    table2: "thong_tin_thanh_toan",
                                    fieldCon: "DV_MaDV",
                                    type: "LEFT JOIN ",
                                },
                                {
                                    table1: "chi_tiet_don_hang",
                                    table2: "gia_san_pham",
                                    fieldCon: "GSP_MaGSP",
                                },
                                {
                                    table1: "chi_tiet_don_hang",
                                    table2: "khuyen_mai",
                                    fieldCon: "KM_MaKM",
                                    type: "LEFT JOIN",
                                },
                            ],
                            `DH_MaDH="${order[i].DH_MaDH}"`
                        );
                        onlineOrderDetail[`${order[i].DH_MaDH}`] = orderDetail;
                    }
                }
                return res.status(201).json({ onlineOrderDetail, order });
            } catch (error) {}
        }
    },
    // getDashBoard: async (req, res) => {
    //     if (req.LND_MaLND !== "QTVBD") {
    //         return res.status(403).json({
    //             status: false,
    //             message: "Bạn không có quyền truy cập tài nguyên",
    //         });
    //     } else {
    //         try {
    //             const [product] = await countData("san_pham", "SP_MaSP");
    //             const products = await getByColumn(
    //                 "san_pham",
    //                 "LSP_MaLSP",
    //                 "HTX"
    //             );
    //             let productVerify = 0;
    //             for (let i = 0; i < products.length; ++i) {
    //                 if (products[i].SP_MinhChung !== "") {
    //                     if (products[i].SP_Chuan === null) {
    //                         productVerify += 1;
    //                     } else {
    //                         let numMC =
    //                             products[i].SP_MinhChung.split(", ").length;

    //                         let numChuan =
    //                             products[i].SP_Chuan.split(", ").length;
    //                         if (numMC > numChuan) {
    //                             productVerify += 1;
    //                         }
    //                     }
    //                 }
    //             }

    //             const [dnProduct] = await countData(
    //                 "san_pham",
    //                 "SP_MaSP",
    //                 `LSP_MaLSP="DN"`
    //             );
    //             const [htxProduct] = await countData(
    //                 "san_pham",
    //                 "SP_MaSP",
    //                 `LSP_MaLSP="HTX"`
    //             );

    //             const columnData = await getDataCustom(
    //                 "",
    //                 "date_format(str_to_date(SP_NgayCapNhat, '%d/%m/%Y'), '%m') AS month , date_format(str_to_date(SP_NgayCapNhat, '%d/%m/%Y'), '%Y') as year, count(date_format(str_to_date(SP_NgayCapNhat, '%d/%m/%Y'), '%m')) as sanPham",
    //                 "san_pham",
    //                 `where date_format(str_to_date(SP_NgayCapNhat, '%d/%m/%Y'), '%Y') = year(CURDATE()) group by Month`
    //             );

    //             return res.status(201).json({
    //                 status: true,
    //                 result: {
    //                     product: product.CountValue,
    //                     productVerify,
    //                     dnProduct: dnProduct.CountValue,
    //                     htxProduct: htxProduct.CountValue,
    //                     columnData,
    //                 },
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // },
    // getProductVerify: async (req, res) => {
    //     if (req.LND_MaLND !== "QTVBD") {
    //         return res.status(403).json({
    //             status: false,
    //             message: "Bạn không có quyền truy cập tài nguyên",
    //         });
    //     } else {
    //         try {
    //             const products = await getRowJoins(
    //                 "san_pham",
    //                 [
    //                     {
    //                         table1: "san_pham",
    //                         table2: "gia_san_pham",
    //                         fieldCon: "GSP_MaGSP",
    //                     },
    //                     {
    //                         table1: "san_pham",
    //                         table2: "don_vi",
    //                         fieldCon: "DV_MaDV",
    //                     },
    //                     {
    //                         table1: "don_vi",
    //                         table2: "dia_chi_chi_tiet",
    //                         fieldCon: "DCCT_MaDCCT",
    //                     },
    //                     {
    //                         table1: "dia_chi_chi_tiet",
    //                         table2: "xa_phuong",
    //                         fieldCon: "XP_MaXP",
    //                     },
    //                     {
    //                         table1: "xa_phuong",
    //                         table2: "quan_huyen",
    //                         fieldCon: "QH_MaQH",
    //                     },
    //                     {
    //                         table1: "quan_huyen",
    //                         table2: "tinh_thanh",
    //                         fieldCon: "TT_MaTT",
    //                     },
    //                 ],
    //                 `LSP_MaLSP="HTX"`
    //             );

    //             let productVerify = [];
    //             for (let i = 0; i < products.length; ++i) {
    //                 if (products[i].SP_MinhChung !== "") {
    //                     if (products[i].SP_Chuan === null) {
    //                         productVerify.push(products[i]);
    //                     } else {
    //                         let numMC =
    //                             products[i].SP_MinhChung.split(", ").length;

    //                         let numChuan =
    //                             products[i].SP_Chuan.split(", ").length;
    //                         if (numMC > numChuan) {
    //                             productVerify.push(products[i]);
    //                         }
    //                     }
    //                 }
    //             }
    //             return res.status(201).json({ status: true, productVerify });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // },
    // confirmVerify: async (req, res) => {
    //     if (req.LND_MaLND !== "QTVBD") {
    //         return res.status(403).json({
    //             status: false,
    //             message: "Bạn không có quyền truy cập tài nguyên",
    //         });
    //     } else {
    //         try {
    //             const {
    //                 verify,
    //                 checkVerify,
    //                 verifyLink,
    //                 checkVerifyLink,
    //                 SP_MaSP,
    //             } = req.body;
    //             let arrayUpdate = [];
    //             if (checkVerify) arrayUpdate.push(`SP_Chuan="${verify}"`);
    //             if (checkVerifyLink)
    //                 arrayUpdate.push(`SP_MinhChung="${verifyLink}"`);
    //             await updateRows(
    //                 "san_pham",
    //                 arrayUpdate.join(", "),
    //                 `SP_MaSP="${SP_MaSP}"`
    //             );
    //             return res
    //                 .status(201)
    //                 .json({ status: true, message: "Xác minh thành công" });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // },
};

export default qtvdbController;
