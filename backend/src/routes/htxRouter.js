import express from "express";
import verifyToken from "../middleware/auth.js";
import commonController from "../controllers/commonController.js";
import uploadCloud from "../configs/cloudinary.config.js";
import htxController from "../controllers/htxController.js";
const router = express.Router();

router.post(
    "/upload-image",
    verifyToken,
    uploadCloud.single("image"),
    commonController.uploadImage
);
router.post(
    "/upload-images",
    verifyToken,
    uploadCloud.array("images", 10),
    commonController.uploadImages
);

router.post("/create-product", verifyToken, htxController.createProduct);
router.post("/update-info", verifyToken, htxController.updateInfo);
router.get("/get-order", verifyToken, htxController.getOrder);
router.put("/confirm-order", verifyToken, htxController.confirmOrder);
router.put("/cancel-order", verifyToken, htxController.cancelOrder);
router.put("/ship-order", verifyToken, htxController.shipOrder);
router.put("/intro-product", verifyToken, htxController.introProduct);
router.put("/update-product", verifyToken, htxController.updateProduct);
export default router;
