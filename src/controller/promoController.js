const {
  postCoupon,
  getPromoByIdModel,
  patchPromo,
  deletePromoModel,
} = require("../model/promoModel");

const helper = require("../helper/response");
// const qs = require("querystring");

module.exports = {
  createCoupon: async (req, res) => {
    try {
      const {
        coupon_code,
        start_coupon,
        end_coupon,
        coupon_discount,
        product_id,
      } = req.body;

      const setDataPromo = await {
        coupon_code,
        start_coupon,
        end_coupon,
        coupon_discount,
        product_id,
      };
      const result = await postCoupon(setDataPromo);
      console.log(result);
      return helper.response(res, 200, "Success Post Promo", result);
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getPromoById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getPromoByIdModel(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Promo By Id", result);
      } else {
        return helper.response(res, 404, `Promo By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  updatePromo: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        coupon_code,
        start_coupon,
        end_coupon,
        coupon_discount,
        product_id,
      } = req.body;

      const setData = {
        coupon_code,
        start_coupon,
        end_coupon,
        coupon_discount,
        product_id,
      };
      const checkId = await getPromoByIdModel(id);
      if (checkId.length > 0) {
        const result = await patchPromo(setData, id);
        console.log(result);
        return helper.response(res, 200, `Success update promo`, result);
      } else {
        return helper.response(res, 404, `Coupon By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await getPromoByIdModel(id);
      if (checkId.length > 0) {
        const result = await deletePromoModel(id);
        return helper.response(res, 200, `Promo has been deleted`, result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
