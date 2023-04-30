import {
    countData,
    getAllJoins,
    getAllRow,
    getByColumn,
    getDataCustom,
    getRowJoin,
    getRowJoins,
    updateRows,
} from "../services/db.js";

const qtvController = {
    getDashBoard: async (req, res) => {
        if (req.LND_MaLND !== "QTV") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            let totalViolent = 0;
            try {
                const [account] = await countData("nguoi_dung", "ND_MaND");
                const [verify] = await countData(
                    "don_vi",
                    "DV_MaDV",
                    `DV_XacMinh IS NULL`
                );
                const [warning] = await countData(
                    "nguoi_dung",
                    "ND_MaND",
                    "ND_CanhBao IS NOT NULL"
                );

                if (warning.CountValue !== 0) {
                    const warningList = await getAllRow("don_vi");
                    console.log(warningList);
                    totalViolent = warningList.reduce((accumulator, unit) => {
                        let unitWarning = parseInt(
                            unit.DV_CanhBao.split(" ")[0]
                        );
                        if (unitWarning === 3) {
                            return accumulator + 1;
                        }
                    }, 0);
                }
                const [htx] = await countData(
                    "nguoi_dung",
                    "ND_MaND",
                    `LND_MaLND="HTX"`
                );
                const [dn] = await countData(
                    "nguoi_dung",
                    "ND_MaND",
                    `LND_MaLND="DN"`
                );
                const [nv] = await countData(
                    "nguoi_dung",
                    "ND_MaND",
                    `LND_MaLND="NV"`
                );
                const columnData = await getDataCustom(
                    "",
                    "date_format(str_to_date(ND_NgayDangKy, '%d/%m/%Y'), '%m') AS month , date_format(str_to_date(ND_NgayDangKy, '%d/%m/%Y'), '%Y') as year, count(date_format(str_to_date(ND_NgayDangKy, '%d/%m/%Y'), '%m')) as account",
                    "nguoi_dung",
                    `where date_format(str_to_date(ND_NgayDangKy, '%d/%m/%Y'), '%Y') = year(CURDATE()) group by Month`
                );
                return res.status(201).json({
                    status: true,
                    result: {
                        account: account.CountValue,
                        verify: verify.CountValue,
                        warning: warning.CountValue,
                        violent: totalViolent,
                        pieData: {
                            htx: htx.CountValue,
                            dn: dn.CountValue,
                            nv: nv.CountValue,
                            qtv:
                                account.CountValue -
                                htx.CountValue -
                                dn.CountValue -
                                nv.CountValue,
                        },
                        columnData,
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    getAccounts: async (req, res) => {
        if (req.LND_MaLND !== "QTV") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            const { search, newAdd, typeAccount } = req.query;
            const customSearch = (" " + search?.trim() + " ").replaceAll(
                " ",
                "%"
            );
            let result = [];
            let status = true;
            let message = "";
            try {
                result = await getDataCustom(
                    "",
                    "*",
                    " nguoi_dung inner join loai_nguoi_dung on nguoi_dung.LND_MaLND=loai_nguoi_dung.LND_MaLND",
                    `${
                        search !== "" && typeAccount !== "all"
                            ? `where ND_HoTen LIKE "${customSearch}" AND nguoi_dung.LND_MaLND="${typeAccount}"`
                            : search !== ""
                            ? `where ND_HoTen LIKE "${customSearch}"`
                            : typeAccount !== "all"
                            ? `where nguoi_dung.LND_MaLND="${typeAccount}"`
                            : ""
                    } ${
                        newAdd === "true"
                            ? " order by ND_NgayDangKy DESC, ND_MaND ASC"
                            : " order by ND_MaND ASC"
                    }`
                );
                if (result.length === 0) {
                    result = await getRowJoins("nguoi_dung", [
                        {
                            table1: "nguoi_dung",
                            table2: "loai_nguoi_dung",
                            fieldCon: "LND_MaLND",
                        },
                    ]);
                    status = false;
                    message = "Không có thông tin tìm kiếm phù hợp";
                }
                return res.status(201).json({ status, result, message });
            } catch (error) {
                console.log(error);
            }
        }
    },
    getUnits: async (req, res) => {
        if (req.LND_MaLND !== "QTV") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            const { search, newAdd, typeAccount } = req.query;
            let result = [];
            let status = true;
            let message = "";
            const customSearch = (" " + search?.trim() + " ").replaceAll(
                " ",
                "%"
            );
            try {
                result = await getDataCustom(
                    "",
                    "*",
                    "don_vi inner join loai_don_vi on don_vi.LDV_MaLDV=loai_don_vi.LDV_MaLDV inner join dia_chi_chi_tiet on don_vi.DCCT_MaDCCT=dia_chi_chi_tiet.DCCT_MaDCCT inner join xa_phuong on dia_chi_chi_tiet.XP_MaXP=xa_phuong.XP_MaXP inner join quan_huyen on xa_phuong.QH_MaQH=quan_huyen.QH_MaQH inner join tinh_thanh on quan_huyen.TT_MaTT=tinh_thanh.TT_MaTT",
                    `${
                        search !== "" && typeAccount !== "all"
                            ? `where DV_TenDonVi LIKE "${customSearch}" AND don_vi.LDV_MaLDV="${typeAccount}"`
                            : search !== ""
                            ? `where DV_TenDonVi LIKE "${customSearch}"`
                            : typeAccount !== "all"
                            ? `where don_vi.LDV_MaLDV="${typeAccount}"`
                            : ""
                    } ${
                        newAdd === "true"
                            ? " order by don_vi.DV_MaDV DESC"
                            : " order by don_vi.DV_MaDV ASC"
                    }`
                );
                if (result.length === 0) {
                    result = await getRowJoins("don_vi", [
                        {
                            table1: "don_vi",
                            table2: "loai_don_vi",
                            fieldCon: "LDV_MaLDV",
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
                    ]);
                    status = false;
                    message = "Không có thông tin tìm kiếm phù hợp";
                }
                return res.status(201).json({ status, result, message });
            } catch (error) {
                console.log(error);
            }
        }
    },
    verifyUnit: async (req, res) => {
        if (req.LND_MaLND !== "QTV") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            let status = false;
            let message = "Lỗi! Xác minh thất bại";
            try {
                const { id } = req.body;
                const [result] = await updateRows(
                    "don_vi",
                    `DV_XacMinh=${true}`,
                    `DV_MaDV="${id}"`
                );
                if (result.changedRows !== 0) {
                    status = true;
                    message = "Xác minh thành công";
                }
                return res.status(201).json({ status, message });
            } catch (error) {
                return res.status(201).json({
                    status,
                    message,
                });
            }
        }
    },
};

export default qtvController;
