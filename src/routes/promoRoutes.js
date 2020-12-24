const router = require("express").Router();
const {
  createCoupon,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../controller/promoController");
const { authorization, authorizationforAdmin } = require("../middleware/auth");

router.post("/", authorizationforAdmin, createCoupon);
router.get("/:id", authorization, getPromoById);
router.patch("/:id", authorizationforAdmin, updatePromo);
router.delete("/:id", authorizationforAdmin, deletePromo);

module.exports = router;
