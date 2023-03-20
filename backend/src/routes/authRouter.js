import express from "express";
import authController from "../controllers/authController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifyToken, authController.getUser);
router.post("/refresh_token", authController.refreshToken);
router.get("/get-user-unit", verifyToken, authController.getInfo);
export default router;
