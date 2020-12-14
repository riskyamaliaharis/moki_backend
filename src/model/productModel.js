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
  getProductSortingByName: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product ORDER BY product_name LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductSortingByDate: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product ORDER BY product_created_at ASC LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductSortingByPrice: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product ORDER BY product_price LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProduct: (limit, offset, search) => {
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
  getProductSearching: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE product_name LIKE '%` +
          search +
          `%' ORDER BY product_name LIMIT '` +
          limit +
          `' OFFSET '` +
          offset +
          `' `,
        (error, result) => {
          console.log(error);
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
  getProductCountSearching: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM product WHERE product_name LIKE '%${search}%'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  patchProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET ? WHERE product_id = ?",
        [setData, id],
        (error, result) => {
          console.log(error);
          if (!error) {
            const newResult = {
              product_id: id,
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
  deleteProductProcess: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
