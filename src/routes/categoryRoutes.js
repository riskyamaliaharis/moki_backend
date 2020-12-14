const router = require("express").Router();
const { showCategoryTable } = require("../controller/categoryController");

router.get("/", showCategoryTable);

module.exports = router;
