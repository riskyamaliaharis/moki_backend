const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
const { userRegister, checkEmail } = require("../model/user");
module.exports = {
  userRegister: async (request, response) => {
    // console.log(request.body);
    try {
      const {
        user_name,
        email,
        password,
        display_name,
        first_name,
        last_name,
        mobile,
        gender,
        address,
        member_card_status,
      } = request.body;

      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      const setData = {
        user_name,
        display_name,
        first_name,
        last_name,
        email,
        mobile,
        gender,
        address,
        member_card_status,
        date_account: new Date(),
        password: encryptPassword,
        user_role:
          email !== "admin-moki@gmail.com" ? (user_role = 0) : (user_role = 1),
      };

      const result = await userRegister(setData);
      console.log(result);
      return helper.response(response, 200, "Success Register", result);
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body;

      //   PENGECEKAN KEBERADAAN EMAIL
      const checkDataUser = await checkEmail(email);

      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        );
        if (checkPassword) {
          //GET TOKEN
          const { user_id, user_name, email, user_role } = checkDataUser[0];
          const payload = { user_id, user_name, email, user_role };
          console.log(payload);
          const token = jwt.sign(payload, "privacy", { expiresIn: "3h" });
          console.log(token);
          const result = { ...payload, token };
          const role = user_role === 1 ? "an admin" : "a customer";
          return helper.response(
            response,
            200,
            "Success Login as " + role,
            result
          );
        } else {
          return helper.response(response, 400, "Wrong Password", error);
        }
      } else {
        return helper.response(
          response,
          400,
          "Email/Account not registered",
          error
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
