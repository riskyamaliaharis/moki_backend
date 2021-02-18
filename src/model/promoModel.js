const connection = require('../config/mysql')

module.exports = {
  postCoupon: (setDataPromo) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO promo SET ?',
        setDataPromo,
        (error, result) => {
          if (!error) {
            const newResult = {
              promo_id: result.insertId,
              ...setDataPromo
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getPromoByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promo WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getPromoCountModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS sum FROM promo WHERE promo_id = ?',
        id,
        (error, result) => {
          const newResult = result[0].sum
          !error ? resolve(newResult) : reject(new Error(error))
        }
      )
    })
  },
  patchPromo: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE promo SET ? WHERE promo_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              promo_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getPromoByIdProduct: (product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promo JOIN product ON promo.product_id=product.product_id WHERE product.product_id = ?',
        product_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deletePromoModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM promo WHERE promo_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllPromoModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT promo.*, product.image_src, product.product_price, product.product_name FROM promo JOIN product WHERE promo.product_id=product.product_id ORDER BY promo.start_coupon DESC',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
