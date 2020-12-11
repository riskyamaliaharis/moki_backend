const {
  postProduct,
  getProductCount,
  getProduct,
} = require("../model/productModel");

const helper = require("../helper/response");
const qs = require("querystring");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_status,
      } = req.body;
      // disini kondisi validation
      const setData = {
        category_id,
        product_name,
        product_price,
        product_created_at: new Date(),
        product_status,
      };
      const result = await postProduct(setData);
      console.log(result);
      return helper.response(res, 200, "Success Post Product", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  readProduct: async (req, res) => {
    try {
      let { page, limit } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      const totalData = await getProductCount();
      const totalPage = Math.ceil(totalData / limit);
      const offset = page * limit - limit;
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null;
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null; // page=...&limit=...
      console.log(req.query);
      console.log(qs.stringify(req.query));
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`,
      };
      const result = await getProduct(limit, offset);
      return helper.response(res, 200, "Success Get Product", result, pageInfo);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
