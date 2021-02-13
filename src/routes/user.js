const router = require('express').Router()
const uploadPhoto = require('../middleware/multerUser')
const {
  userRegister,
  loginUser,
  updateUser,
  forgotPassword,
  changePasswordForgot,
  updateStatusAfterActivateEmail
} = require('../controller/user')

router.post('/register', uploadPhoto, userRegister)
router.post('/login', loginUser)
router.post('/update', uploadPhoto, updateUser)
router.post('/forgot', forgotPassword)
router.patch('/changepasswordforgot', changePasswordForgot)
router.patch('/updatestatus/:keys', updateStatusAfterActivateEmail)

module.exports = router
