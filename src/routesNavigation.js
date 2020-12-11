const router = require("express").Router();
const product = require("./routes/productRoutes");

router.use("/product", product);

module.exports = router;
