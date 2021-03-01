const {
  postOrder,
  postOrderHistory,
  getHistoryByIdModel,
  deleteHistoryModel,
  checkOrderInvoice,
  todaysIncomeModel,
  yearsIncomeModel,
  totalOrderModel,
  markAsDoneModel,
  revenuePerMonthModel,
  revenuePerDayModel,
  getHistoryByIdUser,
  getOrderListByIdOrder,
  getAllHistory,
  patchStatusShow
} = require('../model/orderCartModel')

const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { order_invoice, subtotal, user_id } = req.body
      const checkInvoice = await checkOrderInvoice(order_invoice)

      if (checkInvoice < 1) {
        if (subtotal) {
          const setDataOrder = {
            order_invoice,
            subtotal,
            status: 0,
            user_id,
            order_created_at: new Date()
          }
          const result = await postOrder(setDataOrder)
          return helper.response(
            res,
            200,
            'Thank you. Please wait for your order',
            result
          )
        } else {
          return helper.response(res, 400, 'No Order')
        }
      } else {
        return helper.response(res, 400, 'INVOICE HAS BEEN USED')
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  createOrderHistory: async (req, res) => {
    try {
      let generate
      let result = []
      for (let i = 0; i < req.body.length; i++) {
        const { product_id, qty, total, order_id } = req.body[i]

        const setDataOrderHistory = {
          product_id,
          qty,
          total,
          order_id
        }
        generate = await postOrderHistory(setDataOrderHistory)
        result.push(generate)
      }
      return helper.response(res, 200, 'Success Post Order History', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getHistoryByIdModel(id)
      if (result.length > 0) {
        client.setex(`getorderlistbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Order_list', result)
      } else {
        return helper.response(res, 404, `No Order`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getHistoryByIdUser: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getHistoryByIdUser(id)

      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          result[i].detail = await getOrderListByIdOrder(result[i].order_id)
        }
        return helper.response(res, 200, 'Get Success', result)
      } else {
        return helper.response(res, 200, `No Data`, result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params

      const checkId = await getHistoryByIdModel(id)
      if (checkId.length > 0) {
        const result = await deleteHistoryModel(id)
        return helper.response(res, 200, `History has been deleted`, result)
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  todaysIncome: async (req, res) => {
    try {
      let result = await todaysIncomeModel()

      console.log(result)
      if (result === null) result = 0
      return helper.response(
        res,
        200,
        "Success Get Data of Today's Income",
        result
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  yearsIncome: async (req, res) => {
    try {
      const result = await yearsIncomeModel()

      if (result === null) result = 0

      return helper.response(
        res,
        200,
        "Success Get Data of Year's Income",
        result
      )
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  totalOrder: async (req, res) => {
    try {
      const result = await totalOrderModel()
      if (result === null) result = 0
      return helper.response(
        res,
        200,
        'Success Get Data Total Order per Week',
        result
      )
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  markAsDone: async (req, res) => {
    try {
      const { id } = req.params
      const result = await markAsDoneModel(id)
      return helper.response(res, 200, 'Order Process is done', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  revenuePerMonth: async (req, res) => {
    try {
      const mo = await revenuePerMonthModel()
      let result = []
      for (let i = 0; i < 12; i++) {
        let dat = {
          month: i + 1,
          subtotal: 0
        }
        let item = mo.find((element) => element.month == i + 1)
        if (item === undefined) {
          result.push(dat)
        } else {
          result.push(item)
        }
      }
      return helper.response(res, 200, 'Success Get Revenue Per Month', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  revenuePerDay: async (req, res) => {
    try {
      const a = await revenuePerDayModel()
      let result = []

      for (let i = 0; i < 7; i++) {
        let dat = {
          day: i + 1,
          subtotal: 0
        }
        let item = a.find((element) => element.day == i + 1)
        if (item === undefined) {
          result.push(dat)
        } else {
          result.push(item)
        }
      }

      return helper.response(res, 200, 'Success Get Revenue Per Day', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllHistory: async (req, res) => {
    try {
      const result = await getAllHistory()

      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          result[i].detail = await getOrderListByIdOrder(result[i].order_id)
        }
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 200, `No Data`, result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchStatusShow: async (req, res) => {
    try {
      const { orderId } = req.params
      const result = await patchStatusShow(orderId)
      return helper.response(res, 200, 'Delete Success', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
