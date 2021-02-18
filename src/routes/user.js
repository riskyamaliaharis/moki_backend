const router = require('express').Router()
const uploadPhoto = require('../middleware/multerUser')
const {
  userRegister,
  loginUser,
  updateUser,
  forgotPassword,
  changePasswordForgot,
  updateStatusAfterActivateEmail,
  getProfile
} = require('../controller/user')
router.get('/profile/:id', getProfile)
router.post('/register', uploadPhoto, userRegister)
router.post('/login', loginUser)
router.patch('/update/:id', uploadPhoto, updateUser)
router.post('/forgot', forgotPassword)
router.patch('/changepasswordforgot', changePasswordForgot)
router.patch('/updatestatus/:keys', updateStatusAfterActivateEmail)

module.exports = router
