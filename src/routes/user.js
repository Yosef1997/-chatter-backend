const routes = require('express').Router()
const userController = require('../controller/user')
const uploadImage = require('../middleware/uploadProfile')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.get('/:id', authMiddleware.authCheck, validator.valdationResult, userController.getDetailUser)
routes.patch('/', authMiddleware.authCheck, uploadImage, validator.valdationResult, userController.UpdateUser)
routes.get('/', authMiddleware.authCheck, validator.valdationResult, userController.getAllUser)
module.exports = routes
