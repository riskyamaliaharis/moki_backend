const {
  postProduct,
  getProductCount,
  getProduct,
  getProductById,
  patchProduct,
  deleteProductProcess,
  getProductSearching,
  getProductSorting,
  getProductCountSearching,
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
        product_stock,
        image_src,
        product_description,
        payment_method_id,
        delivery_method_id,
        size_id,
        discount_id,
      } = req.body;

      if (
        category_id == "" ||
        product_name == "" ||
        product_price == "" ||
        image_src == "" ||
        product_description == "" ||
        payment_method_id == "" ||
        delivery_method_id == "" ||
        size_id == "" ||
        discount_id == ""
      ) {
        res
          .status(400)
          .send(
            "Oh no! There is data that has not been filled. Please check it again"
          );
      } else {
        const setData = {
          category_id,
          product_name,
          product_price,
          product_created_at: new Date(),
          product_stock,
          image_src,
          product_description,
          payment_method_id,
          delivery_method_id,
          size_id,
          discount_id,
        };
        const result = await postProduct(setData);
        console.log(result);
        return helper.response(res, 200, "Success Post Product", result);
      }
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
          : null;
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
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  readProductSearching: async (req, res) => {
    try {
      let { page, limit, search } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const totalData = await getProductCountSearching(search);
      const totalPage = Math.ceil(totalData / limit);

      const offset = page * limit - limit;
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null;
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null;
      console.log(req.query);
      console.log(qs.stringify(req.query));
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink:
          nextLink && `http://localhost:3000/product/searching?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:3000/product/searching?${prevLink}`,
      };
      let result;
      console.log(totalData);
      if (totalData > 0) {
        result = await getProductSearching(search, limit, offset);
        console.log(result);
        return helper.response(
          res,
          200,
          "Success Get Product",
          result,
          pageInfo
        );
      } else {
        return helper.response(res, 400, "Data not found");
      }
    } catch (error) {
      console.log(error);

      return helper.response(res, 400, "Bad Request", error);
    }
  },

  readProductSorting: async (req, res) => {
    try {
      let { page, limit, sort } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      console.log(sort);
      if (
        sort !== "product_name" &&
        sort !== "product_price" &&
        sort !== "product_created_at"
      ) {
        return helper.response(
          res,
          400,
          "sort parameter must be product_name, product_price, or product_created_at"
        );
      } else {
        const totalData = await getProductCount();
        const totalPage = Math.ceil(totalData / limit);
        const offset = page * limit - limit;
        const prevLink =
          page > 1
            ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
            : null;
        const nextLink =
          page < totalPage
            ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
            : null;
        console.log(req.query);
        console.log(qs.stringify(req.query));
        const pageInfo = {
          page,
          totalPage,
          limit,
          totalData,
          nextLink:
            nextLink && `http://localhost:3000/product/sorting?${nextLink}`,
          prevLink:
            prevLink && `http://localhost:3000/product/sorting?${prevLink}`,
        };
        const result = await getProductSorting(limit, offset, sort);

        return helper.response(
          res,
          200,
          "Success Sorting Product based on " + sort,
          result,
          pageInfo
        );
      }
    } catch (error) {
      console.log(error);

      return helper.response(res, 400, "Bad Request", error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id, product_name, product_price } = req.body;

      const setData = {
        category_id,
        product_name,
        product_price,
        product_updated_at: new Date(),
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        // proses update data
        const result = await patchProduct(setData, id);
        console.log(result);
        return helper.response(res, 200, `Success update product`, result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await deleteProductProcess(id);
        return helper.response(res, 200, `The product has been deleted`);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
