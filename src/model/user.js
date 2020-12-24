const connection = require("../config/mysql");
module.exports = {
  userRegister: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        console.log(error);
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...setData,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_name, email, password, user_role FROM user WHERE email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
