const userController = require('../controller/user')
const routes = require('express').Router()
const uploadImage = require('../middleware/uploadProfile')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')


routes.get('/:id', userController.getDetailUser)
routes.patch('/:id', uploadImage, validator.valdationResult, userController.UpdateUser)
routes.get('', authMiddleware.authCheck, userController.getAllUser)
module.exports = routes
