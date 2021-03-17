const { validationResult } = require('express-validator')
const response = require('../helpers/response')
const fs = require('fs')

exports.valdationResult = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path)
      console.log('test')
    }
    console.log('tes')
    return response(res, 400, false, errors.array()[0].msg)
  }
  return next()
}
