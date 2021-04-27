const routes = require('express').Router()
const authController = require('../controller/auth')
const uploadImage = require('../middleware/uploadProfile')

routes.post('/sign-up', uploadImage, authController.signUp)
routes.post('/sign-in', authController.login)
module.exports = routes
