const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const nodemailer = require('nodemailer')
const {
  userRegister,
  checkEmail,
  checkDataId,
  countDataId,
  updateUserModel,
  getUserByKey
} = require('../model/user')
const fs = require('fs')

module.exports = {
  userRegister: async (request, response) => {
    try {
      let { user_name, email, password } = request.body

      if (user_name === '' || email === '' || password === '') {
        return helper.response(response, 400, 'Data Cannot Empty')
      } else {
        const checkUser = await checkEmail(email)
        const keys = Math.round(Math.random() * 99978)
        console.log('keys' + keys)
        if (checkUser.length > 0) {
          return helper.response(response, 400, 'Email has been registered')
        } else {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(password, salt)
          const setData = {
            user_name,
            email,
            member_card_status: 0,
            user_key: keys,
            user_status: 0,
            date_account: new Date(),
            password: encryptPassword,
            user_role:
              email !== 'admin-moki@gmail.com'
                ? (user_role = 0)
                : (user_role = 1)
          }
          const result = await userRegister(setData)
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: 'mokifoodbeverage@gmail.com',
              pass: '1103154246moki>'
            }
          })

          const mailOptions = {
            from: '"Moki 🍩" <mokifoodbeverage@gmail.com>',
            to: email,
            subject: 'MOKI - Email Activation',
            html: ` <p>Finish Your Register By Activate Your Email</p>
            <a href="${process.env.URL_FE}">
                Click Here To Activate
              </a>`
          }

          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
              return helper.response(response, 400, 'Email is not sent !')
            } else {
              console.log(info)
              return helper.response(response, 200, 'Email has been sent !')
            }
          })
          return helper.response(
            response,
            200,
            'Success Register, Please Check Your Email',
            result
          )
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body

      if (email === '') {
        if (password === '') {
          return helper.response(
            response,
            404,
            'Email and Password Cannot Empty'
          )
        } else {
          return helper.response(response, 400, 'Email Cannot Empty')
        }
      } else if (password === '') {
        return helper.response(response, 400, 'Password Cannot Empty')
      } else {
        const checkDataUser = await checkEmail(email)

        if (checkDataUser.length > 0) {
          const checkPassword = bcrypt.compareSync(
            password,
            checkDataUser[0].password
          )

          if (checkPassword) {
            const { user_id, user_name, email, user_role } = checkDataUser[0]
            const payload = { user_id, user_name, email, user_role }
            const token = jwt.sign(payload, 'privacy', { expiresIn: '3h' })
            console.log(token)
            const result = { ...payload, token }
            const role = user_role === 1 ? 'an admin' : 'a customer'
            return helper.response(
              response,
              200,
              'Success Login as ' + role,
              result
            )
          } else {
            return helper.response(response, 400, 'Wrong Password')
          }
        } else {
          return helper.response(
            response,
            404,
            'Email/Account is not registered'
          )
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateUser: async (request, response) => {
    try {
      const { id } = request.params
      let {
        user_name,
        email,
        password,

        first_name,
        last_name,
        user_photo,
        mobile,
        gender,
        address,
        member_card_status,
        user_role
      } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)
      const countDataUser = await countDataId(id)
      const userData = await checkDataId(id)

      if (countDataUser > 0) {
        if (user_name === '') user_name = userData[0].user_name
        if (email === '') email = userData[0].email
        password === ''
          ? (password = userData[0].password)
          : (password = encryptPassword)

        if (first_name === '') first_name = userData[0].first_name
        if (last_name === '') last_name = userData[0].last_name
        if (req.file === undefined) {
          user_photo = checkId[0].user_photo
        } else {
          if (checkId[0].user_photo !== '') {
            fs.unlink(`uploads/user/${checkId[0].user_photo}`, function (err) {
              if (err) {
                throw err
              } else console.log('File has been changed!')
            })
          }
          user_photo = req.file.filename
        }
        if (mobile === '') mobile = userData[0].mobile
        if (gender === '') gender = userData[0].gender
        if (address === '') address = userData[0].address
        if (member_card_status === '')
          member_card_status = userData[0].member_card_status
        if (user_role === '') user_role = userData[0].user_role

        const setData = {
          user_name,
          email,
          password,

          first_name,
          last_name,
          user_photo,
          mobile,
          gender,
          address,
          member_card_status,
          user_role,
          date_updated_account: new Date()
        }
        const result = await updateUserModel(setData, id)
        return helper.response(
          response,
          200,
          'Success update your data',
          result
        )
      } else {
        fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
          if (err) {
            throw err
          } else console.log('Uploading image is canceled')
        })
        return helper.response(response, 400, 'Data is not found')
      }
    } catch {
      fs.unlink(`uploads/user/${request.file.filename}`, function (err) {
        if (err) {
          throw err
        } else console.log('Uploading image is canceled')
      })
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { email } = request.body
      const checkDataUser = await checkEmail(email)
      if (checkDataUser.length >= 1) {
        const keys = Math.round(Math.random() * 99967)
        console.log(keys)
        const setData = {
          user_key: keys,
          date_updated_account: new Date()
        }
        await updateUserModel(setData, checkDataUser[0].user_id)

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'mokifoodbeverage@gmail.com',
            pass: '1103154246moki>'
          }
        })

        const mailOptions = {
          from: '"Moki 🍩" <mokifoodbeverage@gmail.com>',
          to: email,
          subject: 'MOKI - Forgot Password',
          html: `<a href="${process.env.URL_FE}">
              Click Here To Change Your Password
            </a>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(response, 400, 'Email is not sent !')
          } else {
            console.log(info)
            return helper.response(response, 200, 'Email has been sent !')
          }
        })
      } else {
        return helper.response(response, 400, 'Email / Account not Registed !')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  changePasswordForgot: async (request, response) => {
    try {
      const { key, newPassword, confirmPassword } = request.body
      if (newPassword !== confirmPassword) {
        return helper.response(response, 400, "Password doesn't match")
      } else {
        const checkKey = await getUserByKey(key)
        if (checkKey.length < 1) {
          return helper.response(response, 400, 'Please Resend Your Email')
        } else {
          const id = checkKey[0].user_id
          const update = new Date() - checkKey[0].date_updated_account
          const range = Math.floor(update / 1000 / 60)
          if (range >= 4) {
            const setData = {
              user_key: 0,
              date_updated_account: new Date()
            }
            await updateUserModel(setData, id)
            return helper.response(
              response,
              400,
              'Keys is expired. Please Resend Your Email'
            )
          } else {
            const salt = bcrypt.genSaltSync(7)
            const encryptPassword = bcrypt.hashSync(newPassword, salt)
            const setData = {
              user_password: encryptPassword,
              user_key: 0,
              date_updated_account: new Date()
            }
            await updateUserModel(setData, id)
            return helper.response(response, 200, 'Success Change Password ')
          }
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateStatusAfterActivateEmail: async (request, response) => {
    try {
      const { keys } = request.params
      const user = await getUserByKey(keys)
      if (user.length < 1) {
        return helper.response(response, 400, 'Wrong Key')
      } else {
        const id = user[0].user_id
        const setData = {
          user_status: 1,
          user_key: 0,
          date_updated_account: new Date()
        }
        const result = await updateUserModel(setData, id)
        return helper.response(
          response,
          200,
          'Your Account Has Been Activated',
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
