import { getByColumn, getMaxID, postRow, updateRows } from "../services/db.js";
import commonController from "./commonController.js";

const htxController = {
    createProduct: async (req, res) => {
        const product = req.body;

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

            //Update GSP
            await postRow(
                "gia_san_pham",
                "GSP_MaGSP, GSP_Gia, GSP_DonViTinh, GSP_NgayCapNhat",
                `"${maGSP}", "${product.GSP_Gia}", "${
                    product.GSP_DonViTinh
                }","${new Date().toLocaleString("pt-PT")}"`
            );

            await postRow(
                "san_pham",
                "SP_MaSP, DV_MaDV, LSP_MaLSP, DMSP_MaDMSP, SP_TenSanPham, SP_SoLuongCungCau, SP_ChuKyCungCau, SP_AnhDaiDien, SP_MoTa, SP_AnhMoTa, SP_MinhChung, GSP_MaGSP",
                `"${maSP}", "${product.DV_MaDV}", "${product.LSP_MaLSP}", "${product.DMSP_MaDMSP}", "${product.SP_TenSanPham}", "${product.SP_SoLuongCungCau}", "${product.SP_ChuKyCungCau}", "${product.SP_AnhDaiDien}", "${product.SP_MoTa}", "${product.SP_AnhMoTa}", "${product.SP_MinhChung}", "${maGSP}"`
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
};
export default htxController;
