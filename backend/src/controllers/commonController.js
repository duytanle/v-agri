import {
    countData,
    getAllJoins,
    getAllRow,
    getByColumn,
    getDataCustom,
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
    getProductFilter: async (req, res) => {
        // const type = req.query;
        const {
            category,
            productNew,
            productPrice,
            productStandard,
            productTop,
            search,
            type,
            unitID,
        } = req.query;
        const customSearch = (" " + search?.trim() + " ").replaceAll(" ", "%");
        try {
            let message = "";
            let status = true;
            let result = await getDataCustom(
                ``,
                `* ${
                    productTop === "true"
                        ? ", COUNT(chi_tiet_don_hang.SP_MaSP)"
                        : ""
                }`,
                `(san_pham inner join don_vi on san_pham.DV_MaDV=don_vi.DV_MaDV left join khuyen_mai on san_pham.KM_MaKM=khuyen_mai.KM_MaKM left join gia_san_pham on san_pham.GSP_MaGSP=gia_san_pham.GSP_MaGSP ${
                    productTop === "true"
                        ? "left join chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP)"
                        : ")"
                }`,
                ` ${
                    unitID !== "" ? `WHERE san_pham.DV_MaDV="${unitID}"` : ""
                } ${
                    unitID !== "" && category !== ""
                        ? ` AND DMSP_MaDMSP="${category}"`
                        : category !== ""
                        ? ` WHERE DMSP_MaDMSP="${category}"`
                        : ""
                }${
                    productStandard !== "all" &&
                    unitID === "" &&
                    category === ""
                        ? `WHERE SP_Chuan LIKE "%${productStandard}%"`
                        : productStandard !== "all"
                        ? `AND SP_Chuan LIKE "%${productStandard}%"`
                        : ""
                }${
                    type !== "all" &&
                    unitID === "" &&
                    category === "" &&
                    productStandard === "all"
                        ? `WHERE LSP_MaLSP!="${type}" `
                        : type !== "all"
                        ? `AND LSP_MaLSP!="${type}" `
                        : ""
                }${
                    search !== "" &&
                    type === "all" &&
                    unitID === "" &&
                    category === "" &&
                    productStandard === "all"
                        ? ` WHERE (SP_TenSanPham LIKE "${customSearch}" OR DV_TenDonVi LIKE "${customSearch}")`
                        : search !== ""
                        ? ` AND (SP_TenSanPham LIKE "${customSearch}" OR DV_TenDonVi LIKE "${customSearch}")`
                        : ""
                }${
                    productTop === "true"
                        ? `group by chi_tiet_don_hang.SP_MaSP`
                        : ""
                } ${
                    productPrice !== ""
                        ? `order by GSP_Gia ${productPrice}`
                        : ""
                } ${
                    productNew === "true"
                        ? productPrice !== ""
                            ? `,SP_NgayCapNhat DESC`
                            : `order by SP_NgayCapNhat DESC`
                        : ""
                } `
            );

            if (result.length === 0) {
                result = await getDataCustom(
                    ``,
                    `* ${
                        productTop === "true"
                            ? ", COUNT(chi_tiet_don_hang.SP_MaSP)"
                            : ""
                    }`,
                    `(san_pham inner join don_vi on san_pham.DV_MaDV=don_vi.DV_MaDV left join khuyen_mai on san_pham.KM_MaKM=khuyen_mai.KM_MaKM left join gia_san_pham on san_pham.GSP_MaGSP=gia_san_pham.GSP_MaGSP ${
                        productTop === "true"
                            ? "left join chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP)"
                            : ")"
                    }`,
                    `${
                        unitID !== ""
                            ? ` WHERE san_pham.DV_MaDV="${unitID}"`
                            : ""
                    }${
                        unitID !== "" && category !== ""
                            ? ` AND DMSP_MaDMSP="${category}"`
                            : category !== ""
                            ? ` WHERE DMSP_MaDMSP="${category}"`
                            : ""
                    }${
                        productStandard !== "all" &&
                        unitID === "" &&
                        category === ""
                            ? `WHERE SP_Chuan LIKE "%${productStandard}%"`
                            : productStandard !== "all"
                            ? ` AND SP_Chuan LIKE "%${productStandard}%"`
                            : ""
                    }${
                        type !== "all" &&
                        unitID === "" &&
                        category === "" &&
                        productStandard === "all"
                            ? `WHERE LSP_MaLSP!="${type}" `
                            : type !== "all"
                            ? ` AND LSP_MaLSP!="${type}" `
                            : ""
                    }${
                        search !== "" &&
                        type === "all" &&
                        unitID === "" &&
                        category === "" &&
                        productStandard === "all"
                            ? ` WHERE MATCH (SP_TenSanPham) AGAINST ('${search}' IN NATURAL LANGUAGE MODE) OR  MATCH (don_vi.DV_TenDonVi) AGAINST ('${search}' IN NATURAL LANGUAGE MODE)`
                            : search !== ""
                            ? ` AND MATCH (SP_TenSanPham) AGAINST ('${search}' IN NATURAL LANGUAGE MODE) OR  MATCH (don_vi.DV_TenDonVi) AGAINST ('${search}' IN NATURAL LANGUAGE MODE)`
                            : ""
                    }${
                        productTop === "true"
                            ? `group by chi_tiet_don_hang.SP_MaSP`
                            : ""
                    } ${
                        productPrice !== ""
                            ? `order by GSP_Gia ${productPrice}`
                            : ""
                    } ${
                        productNew === "true"
                            ? productPrice !== ""
                                ? `,SP_NgayCapNhat DESC`
                                : `order by SP_NgayCapNhat DESC`
                            : ""
                    } `
                );

                if (result.length === 0) {
                    // result = await getAllJoins("LEFT JOIN", "san_pham", "*", [
                    //     {
                    // table1: "san_pham",
                    // table2: "gia_san_pham",
                    // fieldCon: "GSP_MaGSP",
                    //     },
                    //     {
                    // table1: "san_pham",
                    // table2: "khuyen_mai",
                    // fieldCon: "KM_MaKM",
                    //     },
                    // ]);
                    result = await getRowJoins(
                        "san_pham",
                        [
                            {
                                table1: "san_pham",
                                table2: "gia_san_pham",
                                fieldCon: "GSP_MaGSP",
                                type: "LEFT JOIN",
                            },
                            {
                                table1: "san_pham",
                                table2: "khuyen_mai",
                                fieldCon: "KM_MaKM",
                                type: "LEFT JOIN",
                            },
                        ],
                        `${type !== "all" ? `LSP_MaLSP != "${type}"` : ""}`
                    );
                    message = "Không có các sản phẩm phù hợp";
                    status = false;
                }
            }
            return res.status(201).json({ status, result, message });
        } catch (error) {
            console.log(error);
        }
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
    getUnitProduct: async (req, res) => {
        try {
            const result = await getRowJoins(
                "san_pham",
                [
                    {
                        table1: "san_pham",
                        table2: "khuyen_mai",
                        fieldCon: "KM_MaKM",
                        type: "LEFT JOIN",
                    },
                    {
                        table1: "san_pham",
                        table2: "gia_san_pham",
                        fieldCon: "GSP_MaGSP",
                    },
                ],
                `DV_MaDV="${req.params.id}"`
            );
            return res.status(201).json({ status: true, result });
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    getProductDetail: async (req, res) => {
        try {
            const [result] = await getRowJoins(
                "san_pham",
                [
                    {
                        table1: "san_pham",
                        table2: "gia_san_pham",
                        fieldCon: "GSP_MaGSP",
                        type: "LEFT JOIN",
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
                `SP_MaSP="${req.params.id}"`
            );

            return res.status(201).json({ status: true, result });
        } catch (error) {
            console.log(error);
        }
    },
    getAnnounce: async (req, res) => {
        try {
            const result = await getByColumn(
                "thong_bao",
                "ND_MaND",
                req.params.id
            );
            return res.status(201).json({ status: true, result });
        } catch (error) {
            console.log(error);
        }
    },
    getDashBoard: async (req, res) => {
        if (req.LND_MaLND !== "DN" && req.LND_MaLND !== "HTX") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            let dashboard = {};
            const id = req.params.id;
            try {
                const [product] = await countData(
                    "san_pham",
                    "SP_MaSP",
                    `DV_MaDV="${id}"`
                );
                const [orderAwait] = await countData(
                    "(san_pham INNER JOIN chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP)",
                    "san_pham.SP_MaSP",
                    `DV_MaDV="${id}" AND TTDH_MaTTDH="CXN"`
                );
                const [orderProgress] = await countData(
                    "(san_pham INNER JOIN chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP)",
                    "san_pham.SP_MaSP",
                    `DV_MaDV="${id}" AND TTDH_MaTTDH="DTH"`
                );
                const warning = await getByColumn(
                    "nguoi_dung",
                    "ND_MaND",
                    `${req.ND_MaND}`
                );
                const pieData = await getDataCustom(
                    "",
                    "chi_tiet_don_hang.SP_MaSP, san_pham.DV_MaDV, san_pham.SP_TenSanPham, SUM(CTDH_GiaTri) as TotalValue",
                    "(san_pham INNER JOIN chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP)",
                    `where san_pham.DV_MaDV="${id}" group by chi_tiet_don_hang.SP_MaSP order by  TotalValue DESC`
                );
                const columnData = await getDataCustom(
                    "",
                    "chi_tiet_don_hang.SP_MaSP, san_pham.DV_MaDV,date_format(str_to_date(DH_NgayDat, '%d/%m/%Y'), '%m') AS Month, SUM(CTDH_GiaTri) as MonthValue, COUNT(date_format(str_to_date(DH_NgayDat, '%d/%m/%Y'), '%m')) as MonthOrder",
                    "(san_pham INNER JOIN chi_tiet_don_hang on san_pham.SP_MaSP=chi_tiet_don_hang.SP_MaSP INNER JOIN don_hang on chi_tiet_don_hang.DH_MaDH=don_hang.DH_MaDH)",
                    `where san_pham.DV_MaDV="${id}" and TTDH_MaTTDH!="HUY" group by Month order by Month ASC`
                );
                const result = {
                    product: product.CountValue,
                    orderAwait: orderAwait.CountValue,
                    orderProgress: orderProgress.CountValue,
                    warning: warning.ND_CanhBao?.split(" ")[0] || 0,
                    pieData,
                    columnData,
                };
                return res.status(201).json({ status: true, result });
            } catch (error) {
                console.log(error);
            }
        }
    },
};

export default commonController;
