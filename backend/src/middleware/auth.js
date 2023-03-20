import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    // [Bearers,token]
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ status: false, message: "Người dùng chưa được xác thực" });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.ND_MaND = decoded.ND_MaND;
        req.LND_MaLND = decoded.LND_MaLND;
        next();
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: "Người dùng không có quyền truy cập",
        });
    }
};
export default verifyToken;
