const router = require('express').Router()
const {
  createOrder,
  getHistoryById,
  getHistoryByIdUser,
  deleteHistory,
  createOrderHistory,
  todaysIncome,
  yearsIncome,
  totalOrder,
  markAsDone,
  revenuePerMonth,
  revenuePerDay,
  getAllHistory,
  patchStatusShow
} = require('../controller/orderCartController')
const { authorization, authorizationforAdmin } = require('../middleware/auth')
const {
  getOrderListByIdRedis,
  clearDataOrderHistoryRedis
} = require('../middleware/redis')

router.get('/history/:id', getHistoryByIdUser)
router.post('/', authorization, clearDataOrderHistoryRedis, createOrder)
router.post(
  '/history',
  authorization,
  clearDataOrderHistoryRedis,
  createOrderHistory
)
router.get('/:id', authorization, getOrderListByIdRedis, getHistoryById)
router.delete('/:id', authorization, clearDataOrderHistoryRedis, deleteHistory)
router.get('/data/todaysincome', authorization, todaysIncome)
router.get('/data/yearsincome', authorization, yearsIncome)
router.get('/data/totalorder', authorization, totalOrder)
router.patch(
  '/:id',
  authorizationforAdmin,
  clearDataOrderHistoryRedis,
  markAsDone
)
router.get('/chart/revenuepermonth', authorization, revenuePerMonth)
router.get('/chart/revenueperday', authorization, revenuePerDay)
router.get('/data/history/all', getAllHistory)
router.patch('/delete/:orderId', authorization, patchStatusShow)

module.exports = router
