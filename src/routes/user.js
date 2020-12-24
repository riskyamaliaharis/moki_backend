const router = require("express").Router();

const { userRegister } = require("../controller/user");
const { loginUser } = require("../controller/user");

router.post("/register", userRegister);
router.post("/login", loginUser);

module.exports = router;
