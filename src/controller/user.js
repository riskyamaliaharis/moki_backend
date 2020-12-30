const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");
const {
  userRegister,
  checkEmail,
  checkDataId,
  countDataId,
  updateUserModel,
} = require("../model/user");
const fs = require("fs");

module.exports = {
  userRegister: async (request, response) => {
    try {
      const {
        user_name,
        email,
        password,
        display_name,
        first_name,
        last_name,
        user_photo,
        mobile,
        gender,
        address,
        member_card_status,
      } = request.body;

      if (
        user_name === "" ||
        email === "" ||
        password === "" ||
        display_name === "" ||
        first_name === "" ||
        last_name === "" ||
        request.file === undefined ||
        mobile === "" ||
        gender === "" ||
        address == "" ||
        member_card_status === ""
      ) {
        fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
          if (err) {
            throw err;
          } else console.log("Uploading image is canceled");
        });
        return helper.response(
          response,
          400,
          "There is data that has not been filled"
        );
      } else {
        const checkUser = await checkEmail(email);

        if (checkUser.length > 0) {
          fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
            if (err) {
              throw err;
            } else console.log("Uploading image is canceled");
          });
          return helper.response(response, 400, "Email has been registered");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(password, salt);
          const setData = {
            user_name,
            display_name,
            first_name,
            last_name,
            user_photo: request.file.filename,
            email,
            mobile,
            gender,
            address,
            member_card_status,
            date_account: new Date(),
            password: encryptPassword,
            user_role:
              email !== "admin-moki@gmail.com"
                ? (user_role = 0)
                : (user_role = 1),
          };

          const result = await userRegister(setData);
          return helper.response(response, 200, "Success Register", result);
        }
      }
    } catch (error) {
      fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
        if (err) {
          throw err;
        } else console.log("Uploading image is canceled");
      });
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body;

      const checkDataUser = await checkEmail(email);

      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        );
        if (checkPassword) {
          const { user_id, user_name, email, user_role } = checkDataUser[0];
          const payload = { user_id, user_name, email, user_role };
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
  updateUser: async (request, respons) => {
    try {
      const { id } = request.params;
      let {
        user_name,
        email,
        password,
        display_name,
        first_name,
        last_name,
        user_photo,
        mobile,
        gender,
        address,
        member_card_status,
        user_role,
      } = request.body;

      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      const countDataUser = await countDataId(id);
      const userData = await checkDataId(id);

      if (countDataUser > 0) {
        if (user_name === "") user_name = userData[0].user_name;
        if (email === "") email = userData[0].email;
        password === ""
          ? (password = userData[0].password)
          : (password = encryptPassword);
        if (display_name === "") display_name = userData[0].display_name;
        if (first_name === "") first_name = userData[0].first_name;
        if (last_name === "") last_name = userData[0].last_name;
        if (req.file === undefined) {
          user_photo = checkId[0].user_photo;
        } else {
          if (checkId[0].user_photo !== "") {
            fs.unlink(`uploads/user/${checkId[0].user_photo}`, function (err) {
              if (err) {
                throw err;
              } else console.log("File has been changed!");
            });
          }
          user_photo = req.file.filename;
        }
        if (mobile === "") mobile = userData[0].mobile;
        if (gender === "") gender = userData[0].gender;
        if (address === "") address = userData[0].address;
        if (member_card_status === "")
          member_card_status = userData[0].member_card_status;
        if (user_role === "") user_role = userData[0].user_role;

        const setData = {
          user_name,
          email,
          password,
          display_name,
          first_name,
          last_name,
          user_photo,
          mobile,
          gender,
          address,
          member_card_status,
          user_role,
          date_updated_account: new Date(),
        };
        const result = await updateUserModel(setData, id);
        return helper.response(
          response,
          200,
          "Success update your data",
          result
        );
      } else {
        fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
          if (err) {
            throw err;
          } else console.log("Uploading image is canceled");
        });
        return helper.response(response, 400, "Data is not found");
      }
    } catch {
      fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
        if (err) {
          throw err;
        } else console.log("Uploading image is canceled");
      });
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
