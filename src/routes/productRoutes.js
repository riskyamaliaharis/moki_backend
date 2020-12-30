const router = require("express").Router();
const uploadImage = require("../middleware/multer");
const {
  createProduct,
  readProduct,
  readProductSearching,
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
  getProductByCategoryRedis,
  getProductSearchingRedis,
} = require("../middleware/redis");

router.post(
  "/",
  authorizationforAdmin,
  clearDataProductRedis,
  uploadImage,
  createProduct
);
router.get("/", authorization, getProductRedis, readProduct);
router.get(
  "/selectproduct/:id",
  authorization,
  getProductByIdRedis,
  readProductById
);
router.get(
  "/category",
  authorization,
  getProductByCategoryRedis,
  readProductByCategory
);
router.get(
  "/searching",
  authorization,
  getProductSearchingRedis,
  readProductSearching
);
router.patch(
  "/:id",
  authorizationforAdmin,
  clearDataProductRedis,
  uploadImage,
  updateProduct
);
router.delete(
  "/:id",
  authorizationforAdmin,
  clearDataProductRedis,
  deleteProduct
);

module.exports = router;
