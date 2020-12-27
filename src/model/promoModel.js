const connection = require("../config/mysql");

module.exports = {
  postCoupon: (setDataPromo) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO promo SET ?",
        setDataPromo,
        (error, result) => {
          if (!error) {
            const newResult = {
              promo_id: result.insertId,
              ...setDataPromo,
            };
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  getPromoByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM promo WHERE promo_id = ?",
        id,
        (error, result) => {
          console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getPromoCountModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) FROM promo WHERE promo_id = ?",
        id,
        (error, result) => {
          console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  patchPromo: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE promo SET ? WHERE promo_id = ?",
        [setData, id],
        (error, result) => {
          console.log(error);
          if (!error) {
            const newResult = {
              promo_id: id,
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
  deletePromoModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM promo WHERE product_id = ?",
        id,
        (error, result) => {
          console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
