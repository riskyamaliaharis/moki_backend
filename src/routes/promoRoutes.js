const router = require("express").Router();
const {
  createCoupon,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../controller/promoController");

router.post("/", createCoupon);
router.get("/:id", getPromoById);
router.patch("/:id", updatePromo);
router.delete("/:id", deletePromo);

module.exports = router;
