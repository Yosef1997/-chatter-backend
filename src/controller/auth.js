const userModel = require('../models/user')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { APP_KEY } = process.env

exports.signUp = async (req, res) => {
  try {
    const { name, password, phone, picture } = req.body
    const isExist = await userModel.getUsersByCondition({ phone })
    if (isExist.length < 1) {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(password, salt)
      if (picture === undefined) {
        const createUser = await userModel.createUser({ name, password: encryptedPassword, phone, picture: null })
        if (createUser.insertId > 0) {
          return response(res, 200, true, 'Register Success')
        } else {
          return response(res, 400, false, 'Register Failed')
        }
      } else {
        const createUser = await userModel.createUser({ name, password: encryptedPassword, phone, picture })
        if (createUser.insertId > 0) {
          return response(res, 200, true, 'Register Success')
        } else {
          return response(res, 400, false, 'Register Failed')
        }
      }
    } else {
      return response(res, 400, false, 'Phone number already used')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.login = async (req, res) => {
  try {
    const { phone } = req.body
    const existingUser = await userModel.getUsersByCondition({ phone })
    console.log(existingUser)
    if (existingUser.length > 0) {
      const { id, name, email, password, phone, userID, status, picture } = existingUser[0]
      const token = jwt.sign({ id, name, email, password, phone, userID, status, picture }, APP_KEY)
      const results = {
        token: token
      }
      return response(res, 200, true, 'Login success', results)
    } else {
      return response(res, 401, false, 'Phone number not registered')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
