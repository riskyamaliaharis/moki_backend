const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "moki_food_beverage",
//   timezone: "UTC",
// });
let host = process.env.DB_HOST;
let user = process.env.DB_USER;
let pass = process.env.DB_PASS;
let db = process.env.DB_NAME;
let timezone = process.env.DB_TIMEZONE;

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: db,
  timezone: timezone,
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now connected ...");
});

module.exports = connection;
