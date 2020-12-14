const {
  postOrder,
  getPrice,
  postOrderHistory,
  getHistoryByIdModel,
  deleteHistoryModel,
  //   countSubtotal,
  //   updateSubtotal,
} = require("../model/orderCartModel");

const helper = require("../helper/response");
// const { patch } = require("../routes/orderCartRoutes");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const {
        order_invoice,
        subtotal,
        status,
        user_id,
        product_id,
        qty,
      } = req.body;
      const setDataOrder = {
        order_invoice,
        subtotal,
        status,
        user_id,
      };
      const result = await postOrder(setDataOrder);
      const order_id = result.order_id;
      let total = await getPrice(product_id);
      total = total[0].product_price * qty;
      //   const total = price * qty;

      const setDataOrderHistory = {
        product_id,
        qty,
        total,
        order_id,
      };

      const result2 = await postOrderHistory(setDataOrderHistory);
      //   let sum = await countSubtotal(order_id);
      //   sum = sum[0].SUM(total);
      //   let updateSubtotal = await updateSubtotal(sum, order_id);

      return helper.response(res, 200, "Success Post Order", result2);
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getHistoryByIdModel(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get History By Id", result);
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
