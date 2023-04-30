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

const qtvdbController = {
    getDashBoard: async (req, res) => {
        if (req.LND_MaLND !== "QTVBD") {
            return res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        } else {
            let totalViolent = 0;
            let confirmStandard = [];
            try {
                const [product] = await countData("san_pham", "SP_MaSP");
                const products = await getByColumn(
                    "san_pham",
                    "LSP_MaLSP",
                    "HTX"
                );

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
                    const [warningList] = await getAllRow("don_vi");
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
};

export default qtvdbController;
