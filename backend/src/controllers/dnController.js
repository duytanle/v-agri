import {
    getRowJoins,
    getByColumn,
    getMaxID,
    postRow,
    updateRows,
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
    updateInfo: async (req, res) => {
        const data = req.body;
        console.log(data);
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
                await postRow(
                    "gio_hang",
                    "SP_MaSP, DN_MaQL, GH_SoLuong, GH_ChuKyNhan, GH_NgayNhan, GH_ThoiHan",
                    `"${data.SP_MaSP}", "${data.DN_MaQL}", "${data.GH_SoLuong}", "${data.GH_ChuKyNhan}", "${data.GH_NgayNhan}", "${data.GH_ThoiHan}"`
                );
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
                            table2: "don_vi",
                            fieldCon: "DV_MaDV",
                        },
                    ],
                    `DN_MaQL="${dn.DN_MaQL}"`
                );
                const data = result.map((item) => {
                    return {
                        DV_DienThoai: item.DV_DienThoai,
                        DV_Email: item.DV_Email,
                        DV_Logo: item.DV_Logo,
                        DV_MaDV: item.DV_MaDV,
                        DV_TenDonVi: item.DV_TenDonVi,
                        GH_ChuKyNhan: item.GH_ChuKyNhan,
                        GH_NgayNhan: item.GH_NgayNhan,
                        GH_SoLuong: item.GH_SoLuong,
                        GH_ThoiHan: item.GH_ThoiHan,
                        SP_MaSP: item.SP_MaSP,
                    };
                });
                return res.status(201).json({ status: true, result: data });
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
};
export default dnController;
