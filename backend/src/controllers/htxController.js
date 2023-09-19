import {
    deleteRow,
    getByColumn,
    getByColumnCons,
    getMaxID,
    getRowJoins,
    postRow,
    updateRows,
} from "../services/db.js";
import commonController from "./commonController.js";

const htxController = {
    createProduct: async (req, res) => {
        const {
            DV_MaDV,
            LSP_MaLSP,
            DMSP_MaDMSP,
            SP_TenSanPham,
            SP_SoLuongCungCau,
            SP_ChuKyCungCau,
            SP_AnhDaiDien,
            SP_MoTa,
            SP_AnhMoTa,
            SP_MinhChung,
            GSP_Gia,
            GSP_DonViTinh,
            KM_PhanTram,
            KM_NgayBatDau,
            KM_NgayKetThuc,
        } = req.body;

        try {
            const [maxMaSP] = await getMaxID("san_pham", "SP_MaSP");
            const maSP = maxMaSP["MAX(SP_MaSP)"]
                ? commonController.calculateID(maxMaSP["MAX(SP_MaSP)"], "SP")
                : "SP_000001";

            //Create GSP_MaGSP
            const [maxMaGSP] = await getMaxID("gia_san_pham", "GSP_MaGSP");
            const maGSP = maxMaGSP["MAX(GSP_MaGSP)"]
                ? commonController.calculateID(
                      maxMaGSP["MAX(GSP_MaGSP)"],
                      "GSP"
                  )
                : "GSP_000001";
            let maKM = "";
            if (KM_NgayBatDau) {
                const [maxMaKM] = await getMaxID("khuyen_mai", "KM_MaKM");
                maKM = maxMaKM["MAX(KM_MaKM)"]
                    ? commonController.calculateID(
                          maxMaKM["MAX(KM_MaKM)"],
                          "KM"
                      )
                    : "KM_000001";
                await postRow(
                    "khuyen_mai",
                    "KM_MaKM, KM_PhanTram,KM_NgayBatDau,KM_NgayKetThuc",
                    `"${maKM}", "${KM_PhanTram}", "${KM_NgayBatDau}","${KM_NgayKetThuc}"`
                );
            }
            //Update GSP
            await postRow(
                "gia_san_pham",
                "GSP_MaGSP, GSP_Gia, GSP_DonViTinh, GSP_NgayCapNhat",
                `"${maGSP}", "${GSP_Gia}", "${GSP_DonViTinh}","${new Date().toLocaleString(
                    "pt-PT"
                )}"`
            );

            await postRow(
                "san_pham",
                `SP_MaSP, DV_MaDV, LSP_MaLSP, DMSP_MaDMSP, SP_TenSanPham, SP_SoLuongCungCau, SP_ChuKyCungCau, SP_AnhDaiDien, SP_MoTa, SP_AnhMoTa, SP_MinhChung, GSP_MaGSP ${
                    KM_NgayBatDau ? ", KM_MaKM" : ""
                }`,
                `"${maSP}", "${DV_MaDV}", "${LSP_MaLSP}", "${DMSP_MaDMSP}", "${SP_TenSanPham}", "${SP_SoLuongCungCau}", "${SP_ChuKyCungCau}", "${SP_AnhDaiDien}", "${SP_MoTa}", "${SP_AnhMoTa}", "${SP_MinhChung}", "${maGSP}" ${
                    KM_NgayBatDau ? `, "${maKM}"` : ""
                }`
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
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            const {
                SP_MaSP,
                DV_MaDV,
                LSP_MaLSP,
                DMSP_MaDMSP,
                SP_TenSanPham,
                SP_SoLuongCungCau,
                SP_ChuKyCungCau,
                SP_MoTa,
                SP_AnhMoTa,
                SP_MinhChung,
                GSP_Gia,
                GSP_DonViTinh,
                KM_PhanTram,
                KM_NgayBatDau,
                KM_NgayKetThuc,
            } = req.body;
            try {
                if (
                    SP_TenSanPham ||
                    SP_SoLuongCungCau ||
                    SP_ChuKyCungCau ||
                    SP_MoTa ||
                    SP_AnhMoTa ||
                    SP_MinhChung ||
                    GSP_Gia ||
                    KM_NgayBatDau
                ) {
                    let maGSP = "";
                    let maKM = "";
                    if (GSP_Gia) {
                        const [maxMaGSP] = await getMaxID(
                            "gia_san_pham",
                            "GSP_MaGSP"
                        );
                        maGSP = maxMaGSP["MAX(GSP_MaGSP)"]
                            ? commonController.calculateID(
                                  maxMaGSP["MAX(GSP_MaGSP)"],
                                  "GSP"
                              )
                            : "GSP_000001";
                        await postRow(
                            "gia_san_pham",
                            "GSP_MaGSP, GSP_DonViTinh, GSP_Gia, GSP_NgayCapNhat",
                            `"${maGSP}", "${GSP_DonViTinh}",${GSP_Gia}, "${new Date().toLocaleString(
                                "pt-PT"
                            )}"`
                        );
                    }
                    if (KM_NgayBatDau === "delete") {
                        await deleteRow("khuyen_mai", "KM_MaKM", KM_MaKM);
                    } else if (KM_NgayBatDau) {
                        const [maxMaKM] = await getMaxID(
                            "khuyen_mai",
                            "KM_MaKM"
                        );
                        maKM = maxMaKM["MAX(KM_MaKM)"]
                            ? commonController.calculateID(
                                  maxMaKM["MAX(KM_MaKM)"],
                                  "KM"
                              )
                            : "KM_000001";
                        await postRow(
                            "khuyen_mai",
                            "KM_MaKM, KM_PhanTram, KM_NgayBatDau,KM_NgayKetThuc",
                            `"${maKM}", "${KM_PhanTram}", "${KM_NgayBatDau}", "${KM_NgayKetThuc}"`
                        );
                    }
                    let array = [
                        `${DMSP_MaDMSP ? `DMSP_MaDMSP="${DMSP_MaDMSP}"` : ""}`,
                        `${
                            SP_TenSanPham
                                ? `SP_TenSanPham="${SP_TenSanPham}"`
                                : ""
                        }`,
                        `${
                            SP_SoLuongCungCau
                                ? `SP_SoLuongCungCau="${SP_SoLuongCungCau}"`
                                : ""
                        }`,
                        `${
                            SP_ChuKyCungCau
                                ? `SP_ChuKyCungCau="${SP_ChuKyCungCau}"`
                                : ""
                        }`,
                        `${SP_MoTa ? `SP_MoTa="${SP_MoTa}"` : ""}`,
                        `${SP_AnhMoTa ? `SP_AnhMoTa="${SP_AnhMoTa}"` : ""}`,
                        `${
                            SP_MinhChung ? `SP_MinhChung="${SP_MinhChung}"` : ""
                        }`,
                        `${GSP_Gia ? `GSP_MaGSP="${maGSP}"` : ""}`,
                        `${KM_NgayBatDau ? `KM_MaKM="${maKM}"` : ""}`,
                        `SP_NgayCapNhat="${new Date().toLocaleString(
                            "pt-PT"
                        )}"`,
                    ];
                    array = array.filter((item) => item !== "");
                    await updateRows(
                        "san_pham",
                        array.join(", "),
                        `SP_MaSP="${SP_MaSP}"`
                    );
                }
            } catch (error) {
                console.log(error);
            }
            return res.status(201).json({
                status: true,
                message: "Cập nhật thông tin sản phẩm thành công.",
            });
        }
    },
    updateInfo: async (req, res) => {
        const data = req.body;
        let maDCCT = data.DCCT_MaDCCT;

        if (!maDCCT) {
            const [maxMaDCCT] = await getMaxID(
                "dia_chi_chi_tiet",
                "DCCT_MaDCCT"
            );
            maDCCT = maxMaDCCT["MAX(DCCT_MaDCCT)"]
                ? commonController.calculateID(
                      maxMaDCCT["MAX(DCCT_MaDCCT)"],
                      "DCCT"
                  )
                : "DCCT_000001";
            await postRow(
                "dia_chi_chi_tiet",
                "DCCT_MaDCCT, XP_MaXP, DCCT_TenDiaChi",
                `"${maDCCT}", "${data.XP_MaXP}", "${data.DCCT_TenDiaChi}"`
            );
        } else {
            await updateRows(
                "dia_chi_chi_tiet",
                `XP_MaXP="${data.XP_MaXP}", DCCT_TenDiaChi="${data.DCCT_TenDiaChi}"`,
                `DCCT_MaDCCT="${maDCCT}"`
            );
        }

        await updateRows(
            "don_vi",
            `${data.DV_Logo && `DV_Logo="${data.DV_Logo}",`} DV_DienThoai="${
                data.DV_DienThoai
            }", DV_Email="${data.DV_Email}", DV_LinhVuc="${
                data.DV_LinhVuc
            }", DV_MoTa="${data.DV_MoTa}" ${
                data.DV_MinhChung && `, DV_MinhChung="${data.DV_MinhChung}", `
            }, DCCT_MaDCCT="${maDCCT}"`,
            `DV_MaDV="${data.DV_MaDV}"`
        );
        return res
            .status(201)
            .json({ message: "Cập nhật thông tin thành công!" });
    },
    getOrder: async (req, res) => {
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const DV_MaDV = req.query["DV_MaDV"];
                const [htx] = await getByColumn(
                    "qlv_htx",
                    "ND_MaND",
                    `${req.ND_MaND}`
                );

                if (htx.DV_MaDV === DV_MaDV) {
                    const CTDH = await getRowJoins(
                        "don_vi",
                        [
                            {
                                table1: "don_vi",
                                table2: "san_pham",
                                fieldCon: "DV_MaDV",
                            },
                            {
                                table1: "san_pham",
                                table2: "chi_tiet_don_hang",
                                fieldCon: "SP_MaSP",
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
                                table2: "don_hang",
                                fieldCon: "DH_MaDH",
                            },
                            {
                                table1: "don_hang",
                                table2: "qlv_doanh_nghiep",
                                fieldCon: "DN_MaQL",
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

                        `DV_MaDV="${DV_MaDV}"`
                    );
                    for (let i = 0; i < CTDH.length; ++i) {
                        const [dv] = await getByColumn(
                            "don_vi",
                            "DV_MaDV",
                            `${CTDH[i].DV_MaDV}`
                        );

                        CTDH[i].DV_TenDonVi = dv.DV_TenDonVi;
                        CTDH[i].DV_Logo = dv.DV_Logo;
                    }

                    const result = CTDH.map((item) => {
                        return {
                            DV_MaDV: item.DV_MaDV,
                            DV_Logo: item.DV_Logo,
                            DV_TenDonVi: item.DV_TenDonVi,
                            DH_MaDH: item.DH_MaDH,
                            DH_NgayDat: item.DH_NgayDat,
                            PTTT_MaPTTT: item.PTTT_MaPTTT,
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
                            CTDH_GiaTri: item.CTDH_GiaTri,
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
    confirmOrder: async (req, res) => {
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const { ND_MaND, SP_MaSP, DH_MaDH, PTTT_MaPTTT } = req.body;
                if (ND_MaND === req.ND_MaND) {
                    await updateRows(
                        "chi_tiet_don_hang",
                        `TTDH_MaTTDH="${
                            PTTT_MaPTTT === "ONLINE" ? "DTH_CTT" : "DTH"
                        }"`,
                        `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                    );
                    return res.status(201).json({
                        status: true,
                        message: "Đã xác nhận đơn hàng thành công.",
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
    cancelOrder: async (req, res) => {
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const { ND_MaND, SP_MaSP, DH_MaDH } = req.body;
                if (ND_MaND === req.ND_MaND) {
                    const [dh] = await getByColumn(
                        "don_hang",
                        "DH_MaDH",
                        DH_MaDH
                    );
                    const [ctdh] = await getByColumnCons(
                        "chi_tiet_don_hang",
                        `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                    );

                    await updateRows(
                        "chi_tiet_don_hang",
                        `TTDH_MaTTDH=${
                            dh.PTTT_MaPTTT === "ONLINE" ? `"HUY_CHT"` : `"HUY"`
                        }`,
                        `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                    );
                    return res.status(201).json({
                        status: true,
                        message: "Hủy đơn hàng thành công.",
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
    shipOrder: async (req, res) => {
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const { ND_MaND, SP_MaSP, DH_MaDH, CTDH_GiaoHang } = req.body;
                if (ND_MaND === req.ND_MaND) {
                    let giaoHang = "";
                    if (CTDH_GiaoHang) {
                        const ghArray = CTDH_GiaoHang.split(", ");
                        giaoHang = `${ghArray[0]}, giao, ${ghArray[2]}, ${ghArray[3]}`;
                    } else {
                        giaoHang = "0, giao, null, null";
                    }
                    await updateRows(
                        "chi_tiet_don_hang",
                        `CTDH_GiaoHang="${giaoHang}"`,
                        `SP_MaSP="${SP_MaSP}" AND DH_MaDH="${DH_MaDH}"`
                    );
                    return res.status(201).json({
                        status: true,
                        message: "Đã thông báo giao hàng",
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
    introProduct: async (req, res) => {
        if (req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            try {
                const { ND_MaND, DV_MaDV, HTX_MaQL, SP_MaSP, SPGT_DanhSach } =
                    req.body;
                if (ND_MaND === req.ND_MaND) {
                    const [spgt] = await getByColumnCons(
                        "san_pham_gioi_thieu",
                        `HTX_MaQL="${HTX_MaQL}" AND SP_MaSP="${SP_MaSP}"`
                    );
                    if (spgt) {
                        let danhSach = spgt.SPGT_DanhSach;
                        for (let i = 0; i < SPGT_DanhSach.length; ++i) {
                            if (!danhSach.includes(SPGT_DanhSach[i])) {
                                danhSach = danhSach.concat(
                                    ", ",
                                    SPGT_DanhSach[i]
                                );
                            }
                        }
                        await updateRows(
                            "san_pham_gioi_thieu",
                            `SPGT_DanhSach="${danhSach}"`,
                            `SP_MaSP="${SP_MaSP}" AND HTX_MaQL="${HTX_MaQL}"`
                        );
                    } else {
                        await postRow(
                            "san_pham_gioi_thieu",
                            "SP_MaSP, HTX_MaQL, DV_MaDV, SPGT_DanhSach",
                            `"${SP_MaSP}","${HTX_MaQL}", "${DV_MaDV}", "${SPGT_DanhSach.join(
                                ", "
                            )}"`
                        );
                    }
                    return res.status(201).json({
                        status: true,
                        message: "Chào hàng thành công",
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
};
export default htxController;
