const router = require("express").Router();
const {
  createProduct,
  readProduct,
  readProductSearching,
  readProductSorting,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

// http://localhost:3000/product
router.post("/", createProduct);
router.get("/", readProduct);
router.get("/searching", readProductSearching);
router.get("/sorting", readProductSorting);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
