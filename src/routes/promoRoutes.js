const router = require('express').Router()
const {
  createCoupon,
  getPromoById,
  updatePromo,
  deletePromo,
  getAllPromo,
  getPromoByIdProduct
} = require('../controller/promoController')
const { authorization, authorizationforAdmin } = require('../middleware/auth')
const {
  getPromoByIdRedis,
  clearDataPromoRedis
} = require('../middleware/redis')

router.post('/', authorizationforAdmin, clearDataPromoRedis, createCoupon)
router.get('/:id', authorization, getPromoByIdRedis, getPromoById)
router.get('/', getAllPromo)
router.get('/product/:id', getPromoByIdProduct)
router.patch('/:id', authorizationforAdmin, clearDataPromoRedis, updatePromo)
router.delete('/:id', authorizationforAdmin, clearDataPromoRedis, deletePromo)

module.exports = router
