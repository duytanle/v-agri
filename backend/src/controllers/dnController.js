import {
    getRowJoins,
    getByColumn,
    getMaxID,
    postRow,
    updateRows,
    getRowJoin,
    getByColumnCons,
} from "../services/db.js";
import commonController from "./commonController.js";

const dnController = {
    createProduct: async (req, res) => {
        const product = req.body;

        try {
            const [maxMaSP] = await getMaxID("san_pham", "SP_MaSP");
            const maSP = maxMaSP["MAX(SP_MaSP)"]
                ? commonController.calculateID(maxMaSP["MAX(SP_MaSP)"], "SP")
                : "SP_000001";

            await postRow(
                "san_pham",
                "SP_MaSP, DV_MaDV, LSP_MaLSP, DMSP_MaDMSP, SP_TenSanPham, SP_SoLuongCungCau,  SP_AnhDaiDien, SP_MoTa",
                `"${maSP}", "${product.DV_MaDV}", "${product.LSP_MaLSP}", "${product.DMSP_MaDMSP}", "${product.SP_TenSanPham}", "${product.SP_SoLuongCungCau}",  "${product.SP_AnhDaiDien}", "${product.SP_MoTa}"`
            );
            return res
                .status(201)
                .json({ status: true, message: "Thêm sản phẩm thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: true,
                message: "Thêm sản phẩm không thành công",
            });
        }
    },
    updateProduct: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            const data = req.body;
            try {
                await updateRows(
                    "san_pham",
                    `DMSP_MaDMSP="${data.DMSP_MaDMSP}", SP_TenSanPham="${
                        data.SP_TenSanPham
                    }", SP_SoLuongCungCau="${
                        data.SP_SoLuongCungCau
                    }", SP_ChuKyCungCau="${data.SP_ChuKyCungCau}", SP_MoTa="${
                        data.SP_MoTa
                    }" ${
                        data.SP_AnhDaiDien !== ""
                            ? `, SP_AnhDaiDien="${data.SP_AnhDaiDien}"`
                            : ""
                    }`,
                    `DV_MaDV="${data.DV_MaDV}"`
                );
                return res.status(201).json({
                    status: true,
                    message: "Cập nhật thông tin thành công!",
                });
            } catch (error) {
                console.log(error);
                return res.status(500);
            }
        }
    },
    updateInfo: async (req, res) => {
        const data = req.body;
        await updateRows(
            "dia_chi_chi_tiet",
            `XP_MaXP="${data.XP_MaXP}", DCCT_TenDiaChi="${data.DCCT_TenDiaChi}"`,
            `DCCT_MaDCCT="${data.DCCT_MaDCCT}"`
        );
        await updateRows(
            "don_vi",
            `${data.DV_Logo && `DV_Logo="${data.DV_Logo}",`} DV_DienThoai="${
                data.DV_DienThoai
            }", DV_Email="${data.DV_Email}", DV_LinhVuc="${
                data.DV_LinhVuc
            }", DV_MoTa="${data.DV_MoTa}" ${
                data.DV_MinhChung && `, DV_MinhChung="${data.DV_MinhChung}"`
            }`,
            `DV_MaDV="${data.DV_MaDV}"`
        );
        return res
            .status(201)
            .json({ message: "Cập nhật thông tin thành công!" });
    },
    addToCart: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cạp tài nguyên",
            });
        } else {
            const data = req.body;
            try {
                const [exitsSP] = await getByColumnCons(
                    "gio_hang",
                    `SP_MaSP="${data.SP_MaSP}" AND DN_MaQL="${data.DN_MaQL}"`
                );
                console.log(exitsSP);
                if (exitsSP) {
                    await updateRows(
                        "gio_hang",
                        `GH_SoLuong="${data.GH_SoLuong}", GH_ThoiHan="${data.GH_ThoiHan}", GH_ChuKyNhan="${data.GH_ChuKyNhan}", GH_NgayNhan="${data.GH_NgayNhan}"`,
                        `SP_MaSP="${data.SP_MaSP}" AND DN_MaQL="${data.DN_MaQL}"`
                    );
                } else {
                    await postRow(
                        "gio_hang",
                        "SP_MaSP, DN_MaQL, GH_SoLuong, GH_ChuKyNhan, GH_NgayNhan, GH_ThoiHan",
                        `"${data.SP_MaSP}", "${data.DN_MaQL}", "${data.GH_SoLuong}", "${data.GH_ChuKyNhan}", "${data.GH_NgayNhan}", "${data.GH_ThoiHan}"`
                    );
                }
                return res
                    .status(201)
                    .json({ status: true, message: "Đã thêm vào giỏ hàng" });
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: false,
                    message: "Lỗi! Không thêm được vào giỏ hàng",
                });
            }
        }
    },
    getCart: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const [dn] = await getByColumn(
                    "qlv_doanh_nghiep",
                    "ND_MaND",
                    `${req.ND_MaND}`
                );
                const result = await getRowJoins(
                    "gio_hang",
                    [
                        {
                            table1: "gio_hang",
                            table2: "san_pham",
                            fieldCon: "SP_MaSP",
                        },
                        {
                            table1: "san_pham",
                            table2: "khuyen_mai",
                            fieldCon: "KM_MaKM",
                            type: "LEFT JOIN",
                        },
                        {
                            table1: "san_pham",
                            table2: "don_vi",
                            fieldCon: "DV_MaDV",
                        },
                        {
                            table1: "san_pham",
                            table2: "gia_san_pham",
                            fieldCon: "GSP_MaGSP",
                        },
                    ],
                    `DN_MaQL="${dn.DN_MaQL}"`
                );
                return res.status(201).json({ status: true, result });
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateCartItem: async (req, res) => {
        try {
            if (req.LND_MaLND !== "DN") {
                return res.status(403).json({
                    status: false,
                    message: "Bạn không có quyền truy cập tài nguyên",
                });
            } else {
                const data = req.body;
                await updateRows(
                    "gio_hang",
                    `GH_SoLuong="${data.GH_SoLuong}",GH_ChuKyNhan="${data.GH_ChuKyNhan}", GH_NgayNhan="${data.GH_NgayNhan}", GH_ThoiHan="${data.GH_ThoiHan}"`,
                    `SP_MaSP="${data.SP_MaSP}" AND DN_MaQL="${data.DN_MaQL}"`
                );
            }
            return res.status(201).json({
                status: true,
                message: "Đã cập nhật thông tin sản phẩm",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Lỗi! Không cập nhật được thông tin",
            });
        }
    },
    orderProduct: async (req, res) => {
        try {
            if (req.LND_MaLND !== "DN") {
                return res.status(403).json({
                    status: false,
                    message: "Bạn không có quyền truy cập tài nguyên",
                });
            } else {
                const { infoShip, totalOrder, info, DN_MaQL } = req.body;
                let shipAfterHandle = new Array(infoShip.length);
                const [maxMaDH] = await getMaxID("don_hang", "DH_MaDH");
                const maDH = maxMaDH["MAX(DH_MaDH)"]
                    ? commonController.calculateID(
                          maxMaDH["MAX(DH_MaDH)"],
                          "DH"
                      )
                    : "DH_000001";
                await postRow(
                    "don_hang",
                    "DH_MaDH, DN_MaQL, DH_NgayDat, DH_GiaTri",
                    `"${maDH}", "${DN_MaQL}", "${new Date().toLocaleString(
                        "pt-PT"
                    )}", ${totalOrder}`
                );

                for (let i = 0; i < infoShip.length; ++i) {
                    if (infoShip[i].shipMaDCCT) {
                        shipAfterHandle.splice(i, 1, infoShip[i].shipMaDCCT);
                    } else if (
                        infoShip[i].shipReuse &&
                        i < infoShip[i].shipReuse
                    ) {
                        const [maxMaDCCT] = await getMaxID(
                            "dia_chi_chi_tiet",
                            "DCCT_MaDCCT"
                        );
                        const maDCCT = maxMaDCCT["MAX(DCCT_MaDCCT)"]
                            ? commonController.calculateID(
                                  maxMaDCCT["MAX(DCCT_MaDCCT)"],
                                  "DCCT"
                              )
                            : "DCCT_000001";
                        //Create Row DCCT:
                        await postRow(
                            "dia_chi_chi_tiet",
                            "DCCT_MaDCCT, XP_MaXP, DCCT_TenDiaChi",
                            `"${maDCCT}", "${infoShip[i].shipMaXP}", "${infoShip[i].shipDCCT}"`
                        );
                        //Add maDCCT to shipAfterHandle
                        shipAfterHandle.splice(i, 1, maDCCT);
                        if (!shipAfterHandle[infoShip[i].shipReuse]) {
                            shipAfterHandle.splice(
                                infoShip[i].shipReuse,
                                1,
                                maDCCT
                            );
                        }
                    } else if (
                        infoShip[i].shipReuse &&
                        i > infoShip[i].shipReuse
                    ) {
                        const exitsID = shipAfterHandle[infoShip[i].shipReuse];
                        shipAfterHandle.splice(i, 1, exitsID);
                    } else {
                        const [maxMaDCCT] = await getMaxID(
                            "dia_chi_chi_tiet",
                            "DCCT_MaDCCT"
                        );
                        const maDCCT = maxMaDCCT["MAX(DCCT_MaDCCT)"]
                            ? commonController.calculateID(
                                  maxMaDCCT["MAX(DCCT_MaDCCT)"],
                                  "DCCT"
                              )
                            : "DCCT_000001";
                        await postRow(
                            "dia_chi_chi_tiet",
                            "DCCT_MaDCCT, XP_MaXP, DCCT_TenDiaChi",
                            `"${maDCCT}", "${infoShip[i].shipMaXP}", "${infoShip[i].shipDCCT}"`
                        );
                        shipAfterHandle.splice(i, 1, maDCCT);
                    }
                }

                for (let i = 0; i < info.length; ++i) {
                    await postRow(
                        "chi_tiet_don_hang",
                        `SP_MaSP, DH_MaDH, DCCT_MaDCCT, CTDH_ThoiHan, CTDH_SoLuong, CTDH_NgayNhan, CTDH_ChuKyNhan, GSP_MaGSP, TTDH_MaTTDH, CTDH_SoDienThoai${
                            info[i].KM_MaKM ? ", KM_MaKM" : ""
                        }`,
                        `"${info[i].SP_MaSP}", "${maDH}", "${
                            shipAfterHandle[i]
                        }", "${info[i].GH_ThoiHan}", "${
                            info[i].GH_SoLuong
                        }", "${info[i].GH_NgayNhan}", "${
                            info[i].GH_ChuKyNhan
                        }", "${info[i].GSP_MaGSP}", "CXN", "${
                            infoShip[i].shipPhone
                        }"${info[i].KM_MaKM ? `,"${info[i].KM_MaKM}"` : ""}`
                    );
                }

                res.json({ status: true, message: "Đặt hàng thành công!" });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getOrder: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const DN_MaQL = req.query["DN_MaQL"];
                const [dn] = await getByColumn(
                    "qlv_doanh_nghiep",
                    "ND_MaND",
                    `${req.ND_MaND}`
                );
                if (dn.DN_MaQL === DN_MaQL) {
                    // const [donHang] = await getByColumn(
                    //     "don_hang",
                    //     "DN_MaQL",
                    //     `${DN_MaQL}`
                    // );
                    const CTDH = await getRowJoins(
                        "don_hang",
                        [
                            {
                                table1: "don_hang",
                                table2: "chi_tiet_don_hang",
                                fieldCon: "DH_MaDH",
                            },
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
                                table1: "chi_tiet_don_hang",
                                table2: "khuyen_mai",
                                fieldCon: "KM_MaKM",
                                type: "LEFT JOIN",
                            },
                            {
                                table1: "chi_tiet_don_hang",
                                table2: "gia_san_pham",
                                fieldCon: "GSP_MaGSP",
                            },

                            {
                                table1: "chi_tiet_don_hang",
                                table2: "trang_thai_don_hang",
                                fieldCon: "TTDH_MaTTDH",
                            },
                            {
                                table1: "chi_tiet_don_hang",
                                table2: "dia_chi_chi_tiet",
                                fieldCon: "DCCT_MaDCCT",
                            },
                            {
                                table1: "dia_chi_chi_tiet",
                                table2: "xa_phuong",
                                fieldCon: "XP_MaXP",
                            },
                            {
                                table1: "xa_phuong",
                                table2: "quan_huyen",
                                fieldCon: "QH_MaQH",
                            },
                            {
                                table1: "quan_huyen",
                                table2: "tinh_thanh",
                                fieldCon: "TT_MaTT",
                            },
                        ],
                        `DN_MaQL="${dn.DN_MaQL}"`
                    );

                    const result = CTDH.map((item) => {
                        return {
                            DH_MaDH: item.DH_MaDH,
                            DH_NgayDat: item.DH_NgayDat,
                            DV_MaDV: item.DV_MaDV,
                            DV_Logo: item.DV_Logo,
                            DV_TenDonVi: item.DV_TenDonVi,
                            DMSP_MaDMSP: item.DMSP_MaDMSP,
                            SP_MaSP: item.SP_MaSP,
                            SP_TenSanPham: item.SP_TenSanPham,
                            SP_SoLuongCungCau: item.SP_SoLuongCungCau,
                            SP_ChuKyCungCau: item.SP_ChuKyCungCau,
                            SP_AnhDaiDien: item.SP_AnhDaiDien,
                            GSP_Gia: item.GSP_Gia,
                            GSP_DonViTinh: item.GSP_DonViTinh,
                            KM_MaKM: item.KM_MaKM,
                            KM_PhanTram: item.KM_PhanTram,
                            CTDH_ThoiHan: item.CTDH_ThoiHan,
                            CTDH_SoLuong: item.CTDH_SoLuong,
                            CTDH_NgayNhan: item.CTDH_NgayNhan,
                            CTDH_ChuKyNhan: item.CTDH_ChuKyNhan,
                            CTDH_SoDienThoai: item.CTDH_SoDienThoai,
                            CTDH_GiaoHang: item.CTDH_GiaoHang,
                            TTDH_MaTTDH: item.TTDH_MaTTDH,
                            TTDH_TenTrangThai: item.TTDH_TenTrangThai,
                            DCCT_MaDCCT: item.DCCT_MaDCCT,
                            DCCT_TenDiaChi: item.DCCT_TenDiaChi,
                            XP_TenXaPhuong: item.XP_TenXaPhuong,
                            QH_TenQuanHuyen: item.QH_TenQuanHuyen,
                            TT_TenTinhThanh: item.TT_TenTinhThanh,
                        };
                    });

                    return res.status(201).json({ status: true, result });
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "Bạn không có quyền truy cập tài nguyên",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    receiveOrder: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const {
                    ND_MaND,
                    SP_MaSP,
                    DH_MaDH,
                    CTDH_GiaoHang,
                    CTDH_SoLanNhan,
                } = req.body;

                if (ND_MaND === req.ND_MaND) {
                    let giaoHang = "";
                    const ghArray = CTDH_GiaoHang.split(", ");
                    giaoHang = `${parseInt(ghArray[0]) + 1}, null, ${
                        ghArray[2]
                    }, ${ghArray[3]}`;

                    if (parseInt(ghArray[0] + 1) === CTDH_SoLanNhan) {
                        await updateRows(
                            "chi_tiet_don_hang",
                            `CTDH_GiaoHang="${giaoHang}", TTDH_MaTTDH="DHT"`,
                            `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                        );
                    } else {
                        await updateRows(
                            "chi_tiet_don_hang",
                            `CTDH_GiaoHang="${giaoHang}"`,
                            `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                        );
                    }
                    return res.status(201).json({
                        status: true,
                        message: "Đã thông báo nhận hàng",
                    });
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "Bạn không có quyền truy cập tài nguyên",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    getIntro: async (req, res) => {
        if (req.LND_MaLND !== "DN") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const { ND_MaND, DV_MaDV } = req.query;
                if (ND_MaND === req.ND_MaND) {
                    const result = await getByColumn(
                        "san_pham_gioi_thieu",
                        "DV_MaDV",
                        DV_MaDV
                    );
                    for (let item of result) {
                        const [ttsp] = await getByColumn(
                            "san_pham",
                            "SP_MaSP",
                            item.SP_MaSP
                        );
                        item.SP_TenSanPham = ttsp.SP_TenSanPham;
                        item.SP_AnhDaiDien = ttsp.SP_AnhDaiDien;
                        const danhSach = item.SPGT_DanhSach.split(", ");
                        let spgt = [];
                        for (let ds of danhSach) {
                            const [sp] = await getRowJoin(
                                "san_pham",
                                "gia_san_pham",
                                "GSP_MaGSP",
                                `SP_MaSP="${ds}"`
                            );

                            spgt.push(sp);
                        }
                        item.SPGT_DanhSach = spgt;
                    }
                    return res.status(201).json({ status: true, result });
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "Bạn không có quyền truy cập tài nguyên",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
};
export default dnController;
