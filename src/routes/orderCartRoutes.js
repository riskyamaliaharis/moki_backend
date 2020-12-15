const router = require("express").Router();
const {
  createOrder,
  getHistoryById,
  deleteHistory,
  createOrderHistory,
} = require("../controller/orderCartController");

router.post("/", createOrder);
router.post("/history", createOrderHistory);
router.get("/:id", getHistoryById);
router.delete("/:id", deleteHistory);

module.exports = router;
