import express from "express";
import verifyToken from "../middleware/auth.js";
import qltcController from "../controllers/qltcController.js";
const router = express.Router();
router.get("/get-payment-online", verifyToken, qltcController.getPaymentOnline);
export default router;
