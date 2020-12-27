const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/response");

module.exports = {
  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("Data ada dalam Redis");
        return helper.response(
          res,
          200,
          "Success Get Product By Id",
          JSON.parse(result)
        );
      } else {
        console.log("Data tidak ada dalam Redis");
        next();
      }
    });
  },
  getProductRedis: (req, res, next) => {
    client.get(`getproduct:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        console.log("Data ada dalam Redis");
        const newResult = JSON.parse(result);
        return helper.response(
          res,
          200,
          "Success Get Product",
          newResult.result,
          newResult.pageInfo
        );
      } else {
        console.log("Data tidak ada dalam Redis");
        next();
      }
    });
  },
  getProductByCategoryRedis: (req, res, next) => {
    client.get(
      `getproductbycategoryname:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result !== null) {
          console.log("Data ada dalam Redis");
          const newResult = JSON.parse(result);
          return helper.response(
            res,
            200,
            "Success Get Product By Category Name",
            newResult.result,
            newResult.pageInfo
          );
        } else {
          console.log("Data tidak ada dalam Redis");
          next();
        }
      }
    );
  },
  getProductSearchingRedis: (req, res, next) => {
    client.get(
      `getproductsearching:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result !== null) {
          console.log("Data searching ada dalam Redis");
          const newResult = JSON.parse(result);
          return helper.response(
            res,
            200,
            "Success Get Product Searching",
            newResult.result,
            newResult.pageInfo
          );
        } else {
          console.log("Data tidak ada dalam Redis");
          next();
        }
      }
    );
  },
  clearDataProductRedis: (req, res, next) => {
    client.keys("getproduct*", (_error, result) => {
      console.log(result);
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  getPromoByIdRedis: (req, res, next) => {
    const { id } = req.params;
    client.get(`getpromobyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("Data promo ada dalam Redis");
        return helper.response(
          res,
          200,
          "Success Get Promo By Id",
          JSON.parse(result)
        );
      } else {
        console.log("Data promo tidak ada dalam Redis");
        next();
      }
    });
  },
  clearDataPromoRedis: (req, res, next) => {
    client.keys("getpromo*", (_error, result) => {
      console.log(result);
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
