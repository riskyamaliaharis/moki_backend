const {
  postOrder,
  postOrderHistory,
  getHistoryByIdModel,
  deleteHistoryModel,
  checkOrderInvoice,
  getPrice,
  todaysIncomeModel,
  yearsIncomeModel,
  totalOrderModel,
} = require("../model/orderCartModel");

const helper = require("../helper/response");
const redis = require("redis");
const client = redis.createClient();

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
          order_created_at: new Date(),
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
        const { product_id, qty, order_id } = req.body[i];
        console.log(`Product ID : ` + product_id);
        let total = await getPrice(product_id);

        total = total[0].product_price * qty;
        console.log(total);
        const setDataOrderHistory = {
          product_id,
          qty,
          total,
          order_id,
        };
        generate = await postOrderHistory(setDataOrderHistory);
        result.push(generate);
      }

      console.log(result);
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
        client.setex(`getorderlistbyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(res, 200, "Success Get Order_list", result);
      } else {
        return helper.response(res, 404, `No Order`);
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
  todaysIncome: async (req, res) => {
    try {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0"); //string.padStart(targetLength, padString)
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = `${yyyy}-${mm}-${dd}`;

      const result = await todaysIncomeModel(today);
      return helper.response(
        res,
        200,
        "Success Get Data of Today's Income",
        result
      );
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  yearsIncome: async (req, res) => {
    try {
      const result = await yearsIncomeModel();

      return helper.response(
        res,
        200,
        "Success Get Data of Year's Income",
        result
      );
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  totalOrder: async (req, res) => {
    try {
      const result = await totalOrderModel();
      return helper.response(
        res,
        200,
        "Success Get Data Total Order per Week",
        result
      );
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
