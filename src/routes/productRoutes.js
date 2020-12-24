const router = require("express").Router();
const uploadImage = require("../middleware/multer");
const {
  createProduct,
  readProduct,
  readProductSearching,
  // readProductSorting,
  updateProduct,
  deleteProduct,
  readProductByCategory,
  readProductById,
} = require("../controller/productController");
const { authorization, authorizationforAdmin } = require("../middleware/auth");
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis,
} = require("../middleware/redis");

// http://localhost:3000/product
router.post("/", authorizationforAdmin, uploadImage, createProduct);
router.get("/", authorization, getProductRedis, readProduct);
router.get("/selectproduct/:id", getProductByIdRedis, readProductById);
router.get("/category", readProductByCategory);
router.get("/searching", readProductSearching);
// router.get("/sorting", getProductRedis, readProductSorting);
router.patch(
  "/:id",
  authorizationforAdmin,
  clearDataProductRedis,
  updateProduct
); //
router.delete("/:id", authorizationforAdmin, deleteProduct);

module.exports = router;
