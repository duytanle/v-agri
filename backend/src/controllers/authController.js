import {
    getByColumn,
    getMaxID,
    getRowJoin,
    getRowJoins,
    postRow,
    updateRows,
} from "../services/db.js";
import commonController from "./commonController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config("/");

const authController = {
    generateTokens: (payload) => {
        const { ND_MaND, LND_MaLND } = payload;
        const accessToken = jwt.sign(
            { ND_MaND, LND_MaLND },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = jwt.sign(
            { ND_MaND, LND_MaLND },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "48h",
            }
        );

        return { accessToken, refreshToken };
    },
    updateRefreshToken: async (ND_MaND, refreshToken) => {
        await updateRows(
            "nguoi_dung",
            `ND_RefreshToken = "${refreshToken}"`,
            `ND_MaND="${ND_MaND}"`
        );
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const [ND] = await getByColumn("nguoi_dung", "ND_TaiKhoan", username);
        if (ND) {
            const validPassword = await bcrypt.compare(password, ND.ND_MatKhau);
            if (!validPassword) {
                return res.status(403).json({
                    status: false,
                    message: "Mật khẩu nhập không chính xác!",
                });
            } else {
                const tokens = authController.generateTokens(ND);
                await authController.updateRefreshToken(
                    ND.ND_MaND,
                    tokens.refreshToken
                );
                return res.status(201).json({
                    status: true,
                    message: "Đăng nhập thành công",
                    tokens,
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "Tên đăng nhập không tồn tại",
            });
        }
    },
    register: async (req, res) => {
        const { unitName, unitType, unitAccount, unitPassword } = req.body;
        const [DV] = await getByColumn("don_vi", "DV_TenDonVi", unitName);
        if (DV) {
            return res
                .status(409)
                .json({ status: false, message: "Tên đơn vị đã tồn tại" });
        } else {
            const [ND] = await getByColumn(
                "nguoi_dung",
                "ND_TaiKhoan",
                unitAccount
            );
            if (ND) {
                return res.status(409).json({
                    status: false,
                    message: "Tên đăng nhập đã tồn tại.",
                });
            } else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const unitPasswordHashed = await bcrypt.hash(
                        unitPassword,
                        salt
                    );
                    const [maxMaND] = await getMaxID("nguoi_dung", "ND_MaND");
                    const IDND = maxMaND["MAX(ND_MaND)"]
                        ? commonController.calculateID(
                              maxMaND["MAX(ND_MaND)"],
                              "ND"
                          )
                        : "ND_000001";
                    await postRow(
                        "nguoi_dung",
                        "ND_MaND, LND_MaLND, ND_TaiKhoan, ND_MatKhau, ND_NgayDangKy",
                        `"${IDND}", "${unitType}", "${unitAccount}", "${unitPasswordHashed}","${new Date().toLocaleString(
                            "pt-PT"
                        )}"`
                    );

                    const [maxMaDV] = await getMaxID("don_vi", "DV_MaDV");
                    const IDDV = maxMaDV["MAX(DV_MaDV)"]
                        ? commonController.calculateID(
                              maxMaDV["MAX(DV_MaDV)"],
                              "DV"
                          )
                        : "DV_000001";
                    await postRow(
                        "don_vi",
                        "DV_MaDV, DV_TenDonVi, LDV_MaLDV",
                        `"${IDDV}", "${unitName}", "${unitType}"`
                    );

                    if (unitType === "HTX") {
                        const [maxMaHTX] = await getMaxID(
                            "qlv_htx",
                            "HTX_MaQL"
                        );
                        const IDHTX = maxMaHTX["MAX(HTX_MaQL)"]
                            ? commonController.calculateID(
                                  maxMaHTX["MAX(HTX_MaQL)"],
                                  "HTX"
                              )
                            : "HTX_000001";
                        await postRow(
                            "qlv_htx",
                            "HTX_MaQL, ND_MaND, DV_MaDV",
                            `"${IDHTX}", "${IDND}", "${IDDV}"`
                        );
                    } else if (unitType === "DN") {
                        const [maxMaDN] = await getMaxID(
                            "qlv_doanh_nghiep",
                            "DN_MaQL"
                        );
                        const IDDN = maxMaDN["MAX(DN_MaQL)"]
                            ? commonController.calculateID(
                                  maxMaDN["MAX(DN_MaQL)"],
                                  "DN"
                              )
                            : "DN_000001";
                        await postRow(
                            "qlv_doanh_nghiep",
                            "DN_MaQL, ND_MaND, DV_MaDV",
                            `"${IDDN}", "${IDND}", "${IDDV}"`
                        );
                    }

                    return res.status(201).json({
                        status: true,
                        message: "Tài khoản được tạo thành công",
                    });
                } catch (error) {
                    console.log(error);
                    res.status(401).json({ status: false, message: error });
                }
            }
        }
    },
    getUser: async (req, res) => {
        const [ND] = await getByColumn(
            "nguoi_dung",
            "ND_MaND",
            `${req.ND_MaND}`
        );

        if (!ND)
            return res.status(401).json({
                status: false,
                message: "Lấy thông tin người dùng thất bại",
            });
        return res.status(201).json({
            status: true,
            message: "Lấy thông tin người dùng thành công",
            ND,
        });
    },
    refreshToken: async (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const [ND] = await getByColumn(
            "nguoi_dung",
            "ND_RefreshToken",
            `${refreshToken}`
        );
        if (!ND) return res.status(403).json({ status: false });
        try {
            const tokens = authController.generateTokens(ND);

            await authController.updateRefreshToken(
                ND.ND_MaND,
                tokens.refreshToken
            );

            return res.status(201).json({ status: true, tokens });
        } catch (error) {
            console.log(error);
            res.status(403).json({ message: "error" });
        }
    },
    getInfo: async (req, res) => {
        if (req.LND_MaLND === "HTX" || req.LND_MaLND === "DN") {
            const table =
                req.LND_MaLND === "HTX" ? "qlv_htx" : "qlv_doanh_nghiep";
            const [result] = await getRowJoin(
                table,
                "don_vi",
                "DV_MaDV",
                `${table}.ND_MaND="${req.ND_MaND}"`
            );
            if (result) {
                if (result.DCCT_MaDCCT) {
                    const [dia_chi] = await getRowJoins(
                        "dia_chi_chi_tiet",
                        [
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
                        `DCCT_MaDCCT="${result.DCCT_MaDCCT}"`
                    );
                    if (dia_chi) {
                        result["DCCT_TenDCCT"] = dia_chi.DCCT_TenDiaChi;
                        result["XP_MaXP"] = dia_chi.XP_MaXP;
                        result["QH_MaQH"] = dia_chi.QH_MaQH;
                        result["TT_MaTT"] = dia_chi.TT_MaTT;
                        result[
                            "DV_DiaChi"
                        ] = `${dia_chi.DCCT_TenDiaChi} ${dia_chi.XP_TenXaPhuong} ${dia_chi.QH_TenQuanHuyen} ${dia_chi.TT_TenTinhThanh}`;
                    }
                }
                return res.status(201).json({ status: true, result });
            } else {
                return res.status(201).json({
                    status: false,
                    message: "Không tìm thấy thông tin người dùng",
                });
            }
        } else {
            res.status(403).json({
                status: false,
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        }
    },
};

export default authController;
