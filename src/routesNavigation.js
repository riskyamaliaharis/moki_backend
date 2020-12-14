const router = require("express").Router();
const product = require("./routes/productRoutes");
const category = require("./routes/categoryRoutes");
const promo = require("./routes/promoRoutes");
const order = require("./routes/orderCartRoutes");

router.use("/product", product);
router.use("/category", category);
router.use("/promo", promo);
router.use("/orderhistory", order);

module.exports = router;
