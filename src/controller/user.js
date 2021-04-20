const userModel = require('../models/user')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const fs = require('fs')

exports.getDetailUser = async (req, res) => {
  try {
    const { id } = req.params

    const results = await userModel.getUsersByCondition({ id })
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Cant Found Detail User')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.getAllUser = async (req, res) => {
  try{
    const {id} = req.userData
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 4
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'name'
    cond.order = cond.order || 'ASC'

    let totalPage
    let totalData
    
    if (cond.search) {
      totalData = await userModel.getCountUserByCondition(id, cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await userModel.getCountUser(id)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }

    const results = await userModel.getAllUserByCondition(id, cond)
    return response(
      res,
      200,
      true,
      'List of all User',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}contact?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}contact?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  }catch(error){
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      phone,
      status,
      userID,
      picture,
      ...data
    } = req.body
    const salt = await bcrypt.genSalt()

    const initialResults = await userModel.getUsersByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'User Not Found')
    }

    // name
    if (name) {
      if (name === initialResults[0].name) {
        return response(res, 200, true, 'Please insert different name', { name: name })
      } else {
        const updateName = await userModel.updateUser(id, { name: name })
        if (updateName.affectedRows > 0) {
          return response(res, 200, true, 'Name has been updated', { id, name })
        }
        return response(res, 400, false, 'Cant update name')
      }
    }

    // phone
    if (phone) {
      if (phone === initialResults[0].phone) {
        return response(res, 200, true, 'Please insert different phone number', { phone: phone })
      } else {
        const updatePhone = await userModel.updateUser(id, { phone: phone })
        if (updatePhone.affectedRows > 0) {
          return response(res, 200, true, 'Phone number has been updated', { id, phone })
        }
        return response(res, 400, false, 'Cant update phone number1')
      }
    }


    // Status
    if (status) {
      if (status === initialResults[0].status) {
        return response(res, 200, true, 'Please insert different status', { phone: phone })
      } else {
        const updateStatus = await userModel.updateUser(id, { status: status })
        if (updateStatus.affectedRows > 0) {
          return response(res, 200, true, 'status has been updated', { id, status })
        }
        return response(res, 400, false, 'Cant update status')
      }
    }

    // userID
    if (userID) {
      if (userID === initialResults[0].userID) {
        return response(res, 200, true, 'Please insert different userID', { phone: phone })
      } else {
        const updateUserID = await userModel.updateUser(id, { userID: userID })
        if (updateUserID.affectedRows > 0) {
          return response(res, 200, true, 'user ID has been updated', { id, userID })
        }
        return response(res, 400, false, 'Cant update user ID')
      }
    }

    // // Password
    // if (password) {
    //   const compare = bcrypt.compareSync(password, initialResults[0].password)
    //   if (compare) {
    //     const encryptedNewPassword = await bcrypt.hash(newPassword, salt)
    //     const passwordResult = await userModel.updateUser(id, { password: encryptedNewPassword })
    //     if (passwordResult.affectedRows > 0) {
    //       return response(res, 200, true, 'Password have been updated', { id: initialResults[0].id })
    //     }
    //     return response(res, 400, false, 'Password cant update')
    //   }
    //   return response(res, 401, false, 'Wrong current password')
    // }


    // image
    if (req.file) {
      // const updatePicture = await userModel.updateUser(id, {picture: req.file.path})
      const picture = req.file.filename
      const uploadImage = await userModel.updateUser(id, { picture })
      if (uploadImage.affectedRows > 0) {
        if (initialResults[0].picture !== null) {
          fs.unlinkSync(`upload/profile/${initialResults[0].picture}`)
        }
        return response(res, 200, true, 'Image has been Updated', { id, picture })
      }
      return response(res, 400, false, 'Cant update image')
    }

    // info
    const finalResult = await userModel.updateUser(id, data)
    if (finalResult.affectedRows > 0) {
      return response(res, 200, true, 'Personal Information has been updated', { ...initialResults[0], ...data })
    }
    return response(res, 400, false, 'Cant Update personal Information')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
