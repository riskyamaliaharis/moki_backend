const {
  postCoupon,
  getPromoByIdModel,
  patchPromo,
  deletePromoModel,
  getPromoCountModel,
} = require("../model/promoModel");

const helper = require("../helper/response");
const redis = require("redis");
const client = redis.createClient();

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
        client.setex(`getpromobyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(res, 200, "Success Get Promo By Id", result);
      } else {
        return helper.response(res, 404, `Promo By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  updatePromo: async (req, res) => {
    try {
      const { id } = req.params;
      let {
        coupon_code,
        start_coupon,
        end_coupon,
        coupon_discount,
        product_id,
      } = req.body;

      const countId = await getPromoCountModel(id);
      const checkId = await getPromoByIdModel(id);

      if (countId > 0) {
        if (coupon_code === "") {
          coupon_code = checkId[0].coupon_code;
        }
        if (start_coupon === "") {
          start_coupon = checkId[0].start_coupon;
        }
        if (end_coupon === "") {
          end_coupon = checkId[0].end_coupon;
        }
        if (coupon_discount === "") {
          coupon_discount = checkId[0].coupon_discount;
        }
        if (product_id === "") {
          product_id = checkId[0].product_id;
        }
        const setData = {
          coupon_code,
          start_coupon,
          end_coupon,
          coupon_discount,
          product_id,
        };
        const result = await patchPromo(setData, id);
        return helper.response(res, 200, `Success update promo`, result);
      } else {
        return helper.response(
          res,
          404,
          `Coupon By Id : ${id} Is Not Found | Promo is not available`
        );
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params;

      const countId = await getPromoCountModel(id);
      if (countId > 0) {
        const result = await deletePromoModel(id);
        return helper.response(res, 200, `Promo has been deleted`, result);
      } else {
        return helper.response(res, 404, `Promo Is Not Available`);
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
