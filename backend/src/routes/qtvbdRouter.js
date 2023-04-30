import express from "express";
import verifyToken from "../middleware/auth.js";
import qtvdbController from "../controllers/qtvbdController.js";
const router = express.Router();

router.get("/get-dashboard", verifyToken, qtvdbController.getDashBoard);
// router.get("/get-accounts", verifyToken, qtvController.getAccounts);
// router.get("/get-units", verifyToken, qtvController.getUnits);
// router.put("/verify-unit", verifyToken, qtvController.verifyUnit);
export default router;
