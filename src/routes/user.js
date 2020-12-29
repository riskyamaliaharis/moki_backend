const router = require("express").Router();
const uploadPhoto = require("../middleware/multerUser");
const { userRegister, loginUser, updateUser } = require("../controller/user");

router.post("/register", uploadPhoto, userRegister);
router.post("/login", loginUser);
router.post("/update", uploadPhoto, updateUser);

module.exports = router;
