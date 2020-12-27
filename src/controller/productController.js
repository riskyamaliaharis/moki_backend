const {
  postProduct,
  getProductCount,
  checkProduct,
  getProductById,
  patchProduct,
  deleteProductProcess,
  getProductSearching,
  getProductSorting,
  getProductCountSearching,
  getProductCountCategory,
  getProductByCategoryModel,
} = require("../model/productModel");

const helper = require("../helper/response");
const qs = require("querystring");
const redis = require("redis");
const fs = require("fs");
const client = redis.createClient();

module.exports = {
  // POST PRODUCT
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
        delivery_start_hour,
        delivery_end_hour,
        discount_id,
      } = req.body;

      console.log(req.file);

      if (
        category_id == "" ||
        product_name == "" ||
        product_price == "" ||
        image_src == "" ||
        product_description == "" ||
        payment_method_id == "" ||
        delivery_method_id == "" ||
        size_id == "" ||
        delivery_start_hour == "" ||
        delivery_end_hour == "" ||
        discount_id == ""
      ) {
        res
          .status(400)
          .send(
            "There is data that has not been filled. Please check it again"
          );
      } else {
        const totalproduct = await checkProduct(product_name);
        // console.log("total " + totalproduct);
        if (totalproduct > 0) {
          return helper.response(res, 400, "Product has been listed");
        } else {
          const setData = {
            category_id,
            product_name,
            product_price,
            product_created_at: new Date(),
            product_stock,
            image_src: req.file === undefined ? "" : req.file.filename,
            product_description,
            payment_method_id,
            delivery_method_id,
            size_id,
            delivery_start_hour,
            delivery_end_hour,
            discount_id,
          };
          console.log(setData);
          const result = await postProduct(setData);
          console.log(result);
          return helper.response(res, 200, "Success Post Product", result);
        }
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // GET PRODUCT BY ID
  readProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getProductById(id);
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(res, 200, "Success Get Product By Id", result);
      } else {
        return helper.response(
          res,
          404,
          `Product By Id : ${id} is running out`
        );
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // readProduct: async (req, res) => {
  //   try {
  //     let { page, limit } = req.query;
  //     page = parseInt(page);
  //     limit = parseInt(limit);
  //     const totalData = await getProductCount();
  //     const totalPage = Math.ceil(totalData / limit);
  //     const offset = page * limit - limit;
  //     const prevLink =
  //       page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null;
  //     const nextLink =
  //       page < totalPage
  //         ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
  //         : null;
  //     console.log(req.query);
  //     console.log(qs.stringify(req.query));
  //     const pageInfo = {
  //       page,
  //       totalPage,
  //       limit,
  //       totalData,
  //       nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
  //       prevLink: prevLink && `http://localhost:3000/product?${prevLink}`,
  //     };

  //     const result = await getProduct(limit, offset);
  //     return helper.response(res, 200, "Success Get Product", result, pageInfo);
  //   } catch (error) {
  //     console.log(error);
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },

  // GET PRODUCT BY CATEGORY
  readProductByCategory: async (req, res) => {
    try {
      let { page, limit, category_name } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      const totalData = await getProductCountCategory(category_name);
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

      const result = await getProductByCategoryModel(
        limit,
        offset,
        category_name
      );
      return helper.response(res, 200, "Success Get Product", result, pageInfo);
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  // GET PRODUCT -> SEARCHING
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

  // GET PRODUCT (INCLUDING SORTING)
  readProduct: async (req, res) => {
    try {
      let { page, limit, sort } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      console.log(sort);
      if (
        sort !== "product_name ASC" &&
        sort !== "product_name DESC" &&
        sort !== "product_price ASC" &&
        sort !== "product_price DESC" &&
        sort !== "product_created_at ASC" &&
        sort !== "product_created_at DESC" &&
        sort !== ""
      ) {
        return helper.response(
          res,
          400,
          "sort parameter must be product_name ASC/DESC, product_price ASC/DESC, or product_created_at ASC/DESC"
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
        console.log("req.query " + req.query);
        console.log("qs stringify " + qs.stringify(req.query));
        const pageInfo = {
          page,
          totalPage,
          limit,
          totalData,
          nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
          prevLink: prevLink && `http://localhost:3000/product?${prevLink}`,
        };
        const result = await getProductSorting(limit, offset, sort);
        const newData = {
          result,
          pageInfo,
        };
        client.setex(
          `getproduct:${JSON.stringify(req.query)}`,
          3600,
          JSON.stringify(newData)
        );
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

  // UPDATE PRODUCT
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      let {
        category_id,
        product_name,
        product_price,
        product_stock,
        image_src,
        product_description,
        payment_method_id,
        delivery_method_id,
        size_id,
        delivery_start_hour,
        delivery_end_hour,
        discount_id,
      } = req.body;

      console.log("image_src " + image_src);
      const checkId = await getProductById(id);
      console.log(checkId);
      if (checkId.length > 0) {
        if (category_id === "") {
          category_id = checkId[0].category_id;
        }
        if (product_name === "") {
          product_name = checkId[0].product_name;
        }
        if (product_price === "") {
          product_price = checkId[0].product_price;
        }
        if (product_stock === "") {
          product_stock = checkId[0].product_stock;
        }
        if (req.file === undefined) {
          image_src = checkId[0].image_src;
        } else {
          if (checkId[0].image_src !== "") {
            fs.unlink(`uploads/${checkId[0].image_src}`, function (err) {
              if (err) {
                console.log(err);
                throw err;
              } else console.log("File has been changed!");
            });
          }
          image_src = req.file.filename;
        }
        if (product_description === "") {
          product_description = checkId[0].product_description;
        }
        if (payment_method_id === "") {
          payment_method_id = checkId[0].payment_method_id;
        }
        if (delivery_method_id === "") {
          delivery_method_id = checkId[0].delivery_method_id;
        }
        if (size_id === "") {
          size_id = checkId[0].size_id;
        }
        if (delivery_start_hour === "") {
          delivery_start_hour = checkId[0].delivery_start_hour;
        }
        if (delivery_end_hour === "") {
          delivery_end_hour = checkId[0].delivery_end_hour;
        }
        if (discount_id === "") {
          discount_id = checkId[0].discount_id;
        }

        const setData = {
          category_id,
          product_name,
          product_price,
          product_stock,
          image_src,
          product_description,
          payment_method_id,
          delivery_method_id,
          size_id,
          delivery_start_hour,
          delivery_end_hour,
          discount_id,
          product_updated_at: new Date(),
        };

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

  // DELETE PRODUCT (BY ID)
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await getProductById(id);

      const image = checkId[0].image_src;

      console.log(image);

      if (checkId.length > 0) {
        if (image !== "") {
          fs.unlink(`uploads/${image}`, function (err) {
            if (err) {
              console.log(err);
              throw err;
            } else console.log("File deleted!");
          });
        }
        const result = await deleteProductProcess(id);
        return helper.response(
          res,
          200,
          `The product has been deleted`,
          result
        );
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
