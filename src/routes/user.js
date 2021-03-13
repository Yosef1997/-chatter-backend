const userController = require('../controller/user')
const routes = require('express').Router()
const uploadImage = require('../middleware/uploadProfile')


routes.get('/:id', userController.getDetailUser)
routes.patch('/:id', uploadImage, userController.UpdateUser)

module.exports = routes
