const express = require('express');
const { getAllProducts, getProductById, createProduct, deleteProduct, searchProducts, updateProduct, getProductStats, getProductByCategory } = require('../controllers/productController');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
    next();
});

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:term", searchProducts);
router.put("/:id", updateProduct);
router.get("/stats", getProductStats);
router.get("category/:category", getProductByCategory);

module.exports = router;
