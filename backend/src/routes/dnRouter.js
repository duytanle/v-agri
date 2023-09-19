import express, { query } from "express";
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
router.post("/order", verifyToken, dnController.orderProduct);
router.get("/get-order", verifyToken, dnController.getOrder);
router.put("/receive-order", verifyToken, dnController.receiveOrder);
router.get("/get-intro", verifyToken, dnController.getIntro);
router.put("/update-product", verifyToken, dnController.updateProduct);
router.post("/create-payment", verifyToken, dnController.createPayment);
router.post("/delete-order", verifyToken, dnController.deleteOrder);
router.get("/vnpay_ipn", verifyToken, dnController.vnpayIPN);
export default router;
