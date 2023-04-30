import express from "express";
import commonController from "../controllers/commonController.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();
router.get("/get-address", commonController.getAddress);
router.get("/get-category", commonController.getCategory);
router.get("/get-products", commonController.getProduct);
router.get("/get-unit/:id", commonController.getUnit);
router.get("/get-unit-product/:id", commonController.getUnitProduct);
router.get("/get-product-detail/:id", commonController.getProductDetail);
router.get("/get-dashboard/:id", verifyToken, commonController.getDashBoard);
router.get("/get-product-filter", commonController.getProductFilter);
router.get("/get-announce/:id", verifyToken, commonController.getAnnounce);
export default router;
