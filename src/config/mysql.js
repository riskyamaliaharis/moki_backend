const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moki_food_beverage",
  timezone: "UTC",
});

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: "moki_food_beverage",
//   timezone: "UTC",
// });

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now connected ...");
});

module.exports = connection;
