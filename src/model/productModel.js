const connection = require('../config/mysql')

module.exports = {
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO product SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
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

  checkProduct: (product_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM product WHERE product_name = '${product_name}'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductSorting: (limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      if (sort === '') {
        connection.query(
          `SELECT * FROM product WHERE product_stock>0 LIMIT ${limit} OFFSET ${offset}`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      } else {
        connection.query(
          `SELECT * FROM product WHERE product_stock>0 ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
          (error, result) => {
            !error ? resolve(result) : reject(new Errr(error))
          }
        )
      }
    })
  },

  getProductByCategoryModel: (limit, offset, category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category_name = '${category_name}' ORDER BY product.product_name LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getProduct: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE product_stock>0 LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProductSearching: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE product_name LIKE '%${search}%' AND product_stock>0 ORDER BY product_name LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM product WHERE product_stock>0',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductCountId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM product where product_id= ?',
        id,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductCountCategory: (category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM product JOIN category ON product.category_id = category.category_id WHERE category_name = '${category_name}'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductCountSearching: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM product WHERE product_name LIKE '%${search}%'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product JOIN size ON product.size_id=size.size_id JOIN delivery_method ON product.delivery_method_id = delivery_method.delivery_method_id  WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  patchProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET ? WHERE product_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
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
  deleteProductProcess: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
