const mysql = require('mysql')

let host = process.env.DB_HOST
let user = process.env.DB_USER
let pass = process.env.DB_PASS
let db = process.env.DB_NAME

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: db
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now connected ...')
})

module.exports = connection
