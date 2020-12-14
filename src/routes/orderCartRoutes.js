const router = require("express").Router();
const {
  createOrder,
  getHistoryById,
  deleteHistory,
} = require("../controller/orderCartController");

router.post("/", createOrder);
router.get("/:id", getHistoryById);
router.delete("/:id", deleteHistory);

module.exports = router;
