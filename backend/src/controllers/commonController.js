import {
    getAllJoins,
    getAllRow,
    getByColumn,
    getRowJoin,
    getRowJoins,
} from "../services/db.js";

const commonController = {
    calculateID: (maxID, type) => {
        const newIDNum = parseInt(maxID.substr(maxID.length - 6)) + 1;
        return `${type}_${newIDNum.toString().padStart(6, "0")}`;
    },
    uploadImage: async (req, res) => {
        if (req.file) {
            return res.status(201).json({
                status: true,
                path: req.file.path,
            });
        } else {
            return res.status(204);
        }
    },
    uploadImages: async (req, res) => {
        if (req.files) {
            const pathImages = req.files.map((file) => file.path);

            return res.status(201).json({
                status: true,
                paths: pathImages,
            });
        } else {
            return res.status(204);
        }
    },

    getAddress: async (req, res) => {
        const province = await getAllRow("tinh_thanh");
        const district = await getAllRow("quan_huyen");
        const commune = await getAllRow("xa_phuong");
        return res
            .status(201)
            .json({ status: true, result: { province, district, commune } });
    },
    getCategory: async (req, res) => {
        const result = await getAllRow("danh_muc_san_pham");
        return res.status(201).json({ status: true, result });
    },

    getProduct: async (req, res) => {
        const result = await getAllJoins("LEFT JOIN", "san_pham", "*", [
            {
                table1: "san_pham",
                table2: "gia_san_pham",
                fieldCon: "GSP_MaGSP",
            },
            { table1: "san_pham", table2: "khuyen_mai", fieldCon: "KM_MaKM" },
        ]);
        return res.status(201).json({ status: true, result });
    },
    getUnit: async (req, res) => {
        const result = await getRowJoins(
            "don_vi",
            [
                {
                    table1: "don_vi",
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
            `DV_MaDV="${req.params.id}"`
        );
        return res.status(201).json({ status: true, result: result[0] || [] });
    },
};

export default commonController;
