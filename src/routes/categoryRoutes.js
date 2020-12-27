const router = require("express").Router();
const { showCategoryTable } = require("../controller/categoryController");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, showCategoryTable);

module.exports = router;
