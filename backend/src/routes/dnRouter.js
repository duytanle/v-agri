import express from "express";
import verifyToken from "../middleware/auth.js";
import commonController from "../controllers/commonController.js";
import uploadCloud from "../configs/cloudinary.config.js";
import dnController from "../controllers/dnController.js";
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

router.post("/create-product", verifyToken, dnController.createProduct);
router.post("/update-info", verifyToken, dnController.updateInfo);
router.post("/add-to-cart", verifyToken, dnController.addToCart);
router.get("/get-cart", verifyToken, dnController.getCart);
router.put("/update-cart-item", verifyToken, dnController.updateCartItem);
export default router;
