const router = require("express").Router();
const {
  createProduct,
  readProduct,
  readProductSearching,
  readProductSorting,
  updateProduct,
  deleteProduct,
  readProductByCategory,
  readProductById,
} = require("../controller/productController");

// http://localhost:3000/product
router.post("/", createProduct);
router.get("/", readProduct);
router.get("/selectproduct/:id", readProductById);
router.get("/category", readProductByCategory);
router.get("/searching", readProductSearching);
router.get("/sorting", readProductSorting);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
