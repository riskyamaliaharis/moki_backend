const connection = require("../config/mysql");

module.exports = {
  showCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT product_name, product.category_id, category_name FROM product JOIN category ON product.category_id = category.category_id",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
