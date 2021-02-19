const connection = require('../config/mysql')

module.exports = {
  postOrder: (setDataOrder) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO order_cart SET ?',
        setDataOrder,
        (error, result) => {
          if (!error) {
            const newResult = { order_id: result.insertId, ...setDataOrder }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  checkOrderInvoice: (order_invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(order_invoice) AS totalInvoice FROM order_cart WHERE order_invoice='${order_invoice}'`,
        (error, result) => {
          !error ? resolve(result[0].totalInvoice) : reject(new Error(error))
        }
      )
    })
  },
  postOrderHistory: (setDataOrderHistory) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO order_history SET ?',
        setDataOrderHistory,
        (error, result) => {
          if (!error) {
            const newResult = {
              order_history_id: result.insertId,
              ...setDataOrderHistory
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getPrice: (product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_price FROM product WHERE product_id = ${product_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  countSubtotal: (order_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(total) FROM order_history WHERE order_id=? GROUP BY order_id',
        order_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateSubtotal: (sum, order_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE order_cart SET subtotal=? WHERE order_id = ?',
        [sum, order_id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT order_cart.order_invoice, product.product_name, product.product_price, order_history.qty, order_history.total FROM order_history JOIN product ON order_history.product_id = product.product_id JOIN order_cart ON order_cart.order_id = order_history.order_id WHERE order_cart.order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByIdUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT order_cart.*, user.user_name FROM `order_cart` JOIN user ON order_cart.user_id = user.user_id WHERE order_cart.user_id=?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderListByIdOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT order_history.*, product.product_name, product.image_src FROM order_history JOIN product ON order_history.product_id =product.product_id WHERE order_id=?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteHistoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM order_cart WHERE order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  todaysIncomeModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(subtotal) AS subtotal FROM order_cart WHERE DATE(order_created_at) = DATE(NOW())`,
        (error, result) => {
          !error ? resolve(result[0].subtotal) : reject(new Error(error))
        }
      )
    })
  },
  yearsIncomeModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(subtotal) AS subtotal FROM order_cart WHERE YEAR(order_created_at) = YEAR(NOW())',
        (error, result) => {
          !error ? resolve(result[0].subtotal) : reject(new Error(error))
        }
      )
    })
  },
  totalOrderModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM order_cart WHERE YEARWEEK(order_created_at) = YEARWEEK(CURDATE())',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  markAsDoneModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE order_cart SET status = 1 WHERE order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  revenuePerDayModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT DAYOFWEEK(order_created_at) AS day, SUM(subtotal) AS subtotal FROM order_cart WHERE YEARWEEK(order_created_at) = YEARWEEK(CURDATE()) GROUP BY DATE(order_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  revenuePerMonthModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(order_created_at) AS month, SUM(subtotal) AS subtotal FROM order_cart WHERE YEAR(order_created_at) = YEAR(NOW()) GROUP BY MONTH(order_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT order_cart JOIN user ON order_cart.user_id = user.user_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
