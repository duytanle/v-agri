import express from "express";
import commonController from "../controllers/commonController.js";

const router = express.Router();
router.get("/get-address", commonController.getAddress);
router.get("/get-category", commonController.getCategory);
router.get("/get-products", commonController.getProduct);
router.get("/get-unit/:id", commonController.getUnit);
export default router;
