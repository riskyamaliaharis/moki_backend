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
    client.get(
      `getproduct:${JSON.stringify(req.query)}`,
      3600,
      (error, result) => {
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
};
