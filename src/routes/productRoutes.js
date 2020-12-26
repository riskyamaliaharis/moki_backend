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
router.get("/", readProduct); // authorization, getProductRedis,
router.get(
  "/selectproduct/:id",
  authorization,
  getProductByIdRedis,
  readProductById
);
router.get("/category", authorization, readProductByCategory);
router.get("/searching", authorization, readProductSearching);
// router.get("/sorting", getProductRedis, readProductSorting);
router.patch("/:id", authorizationforAdmin, uploadImage, updateProduct); //clearDataProductRedis
router.delete("/:id", authorizationforAdmin, deleteProduct);

module.exports = router;

// https://github.com/riskyamaliaharis/moki_food_beverage
