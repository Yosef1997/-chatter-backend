const routes = require('express').Router()
const authController = require('../controller/auth')

routes.post('/sign-up', authController.signUp)
routes.post('/sign-in', authController.login)
module.exports = routes
