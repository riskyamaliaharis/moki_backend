const router = require("express").Router();
const {
  createProduct,
  readProduct,
} = require("../controller/productController");

router.post("/", createProduct); // http://localhost:3000/product
router.get("/", readProduct);

module.exports = router;
