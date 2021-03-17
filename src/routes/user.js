const userController = require('../controller/user')
const routes = require('express').Router()
const uploadImage = require('../middleware/uploadProfile')
const authMiddleware = require('../middleware/auth')


routes.get('/:id', userController.getDetailUser)
routes.patch('/:id', uploadImage, userController.UpdateUser)
routes.get('', authMiddleware.authCheck, userController.getAllUser)
module.exports = routes
