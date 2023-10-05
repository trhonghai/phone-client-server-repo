const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../app/controller/ProductController");
const { protect, adminOnly } = require("../app/middlewares/authMiddleware");
const router = express.Router();


router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id", protect, adminOnly, updateProduct);


module.exports = router;    