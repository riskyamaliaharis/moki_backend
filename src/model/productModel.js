const connection = require("../config/mysql");

module.exports = {
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO product SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getProductModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS total FROM product",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
};
