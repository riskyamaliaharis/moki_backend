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
router.post(
  "/",
  authorizationforAdmin,
  clearDataProductRedis,
  uploadImage,
  createProduct
); //
router.get("/", authorization, getProductRedis, readProduct);
router.get(
  "/selectproduct/:id",
  authorization,
  getProductByIdRedis,
  readProductById
); //
router.get("/category", authorization, readProductByCategory);
router.get("/searching", authorization, readProductSearching);
router.patch(
  "/:id",
  authorizationforAdmin,
  clearDataProductRedis,
  uploadImage,
  updateProduct
); //
router.delete(
  "/:id",
  authorizationforAdmin,
  clearDataProductRedis,
  deleteProduct
);
// router.get("/sorting", getProductRedis, readProductSorting);

module.exports = router;
