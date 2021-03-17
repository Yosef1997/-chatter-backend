const userModel = require('../models/user')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { APP_KEY, APP_URL } = process.env

exports.signUp = async (req, res) => {
  try{
    const {name, email, password} = req.body
    const isExist = await userModel.getUsersByCondition({email})
    if (isExist.length < 1) {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(password, salt)
      const createUser = await userModel.createUser({name, email, password:encryptedPassword})
      if (createUser.insertId > 0) {
        return response(res, 200, true, 'Register Success')
      } else {
        return response(res, 400, false, 'Register Failed')
      }
    }else {
      return response(res, 400, false, 'Email already used')
    }
  }catch (error){
    return response(res, 400, false, 'Bad Request')
  }
}

exports.login = async (req, res)=> {
  try{
    const {email, password} = req.body
    const existingUser = await userModel.getUsersByCondition({email})
    console.log(existingUser)
    if (existingUser.length > 0) {
      const compare = bcrypt.compareSync(password, existingUser[0].password)
      if (compare) {
        const {id, name, email, password, phone, userID, status, picture } = existingUser[0]
        const token = jwt.sign({id}, APP_KEY)
        const results = {
          token: token
        }
        return response(res, 200, true, 'Login success' ,results)
      } else {
        return response(res, 401, false, 'Wrong password')
      }
    }else {
      return response(res, 401, false, 'Email not registered')
    }
  }catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}