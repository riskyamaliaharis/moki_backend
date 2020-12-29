const router = require("express").Router();
const {
  createOrder,
  getHistoryById,
  deleteHistory,
  createOrderHistory,
  todaysIncome,
  yearsIncome,
  totalOrder,
} = require("../controller/orderCartController");
const { authorization } = require("../middleware/auth");
const {
  getOrderListByIdRedis,
  clearDataOrderHistoryRedis,
} = require("../middleware/redis");

router.post("/", authorization, clearDataOrderHistoryRedis, createOrder);
router.post(
  "/history",
  authorization,
  clearDataOrderHistoryRedis,
  createOrderHistory
);
router.get("/:id", authorization, getOrderListByIdRedis, getHistoryById);
router.delete("/:id", authorization, clearDataOrderHistoryRedis, deleteHistory);
router.get("/data/todaysincome", authorization, todaysIncome);
router.get("/data/yearsincome", authorization, yearsIncome);
router.get("/data/totalorder", authorization, totalOrder);

module.exports = router;
