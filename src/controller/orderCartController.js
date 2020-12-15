const {
  postOrder,
  postOrderHistory,
  getHistoryByIdModel,
  deleteHistoryModel,
  checkOrderInvoice,
  getPrice,
} = require("../model/orderCartModel");

const helper = require("../helper/response");
// const { patch } = require("../routes/orderCartRoutes");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { order_invoice, subtotal, status, user_id } = req.body;
      const checkInvoice = await checkOrderInvoice(order_invoice);
      console.log(checkInvoice);
      if (checkInvoice < 1) {
        const setDataOrder = {
          order_invoice,
          subtotal,
          status,
          user_id,
        };
        const result = await postOrder(setDataOrder);
        return helper.response(res, 200, "Success Post Order", result);
      } else {
        return helper.response(res, 400, "INVOICE HAS BEEN USED");
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  createOrderHistory: async (req, res) => {
    try {
      let generate;
      let result = [];
      for (let i = 0; i < req.body.length; i++) {
        const { product_id, qty, total, order_id } = req.body[i];
        // total = await getPrice(product_id);
        // console.log(total);
        // total = total[0].product_price * qty;
        const setDataOrderHistory = {
          product_id,
          qty,
          total,
          order_id,
        };
        generate = await postOrderHistory(setDataOrderHistory);
        result.push(generate);
      }

      return helper.response(res, 200, "Success Post Order History", result);
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getHistoryByIdModel(id);
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          "Success Get History by order_id",
          result
        );
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await getHistoryByIdModel(id);
      console.log(checkId);
      if (checkId.length > 0) {
        const result = await deleteHistoryModel(id);
        return helper.response(res, 200, `History has been deleted`, result);
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`);
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
