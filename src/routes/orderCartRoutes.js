const router = require("express").Router();
const {
  createOrder,
  getHistoryById,
  deleteHistory,
  createOrderHistory,
} = require("../controller/orderCartController");
const { authorization } = require("../middleware/auth");

router.post("/", authorization, createOrder);
router.post("/history", authorization, createOrderHistory);
router.get("/:id", authorization, getHistoryById);
router.delete("/:id", authorization, deleteHistory);

module.exports = router;
