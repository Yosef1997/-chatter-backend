const chatModel = require('../models/chat')
const response = require('../helpers/response')

exports.createChat = async (req, res) => {
  try{
    const data = {...req.body}
    data.sender = req.userData.id,
    data.receiver = data.receiver,
    data.message = data.message
    const chat = await chatModel.createChat(data)
    if (chat.affectedRows > 0) {
      return response(res, 200, true, 'Chat send', chat[0] )
    }else {
      return response(res, 400, false, 'Chat not send')
    }
  } catch(error) {
    return response(res, 500, false, 'Bad Request')
  }
}

exports.listChat = async (req, res) => {
  try{
    const {id} = req.userData
    const results = await chatModel.getAllChat(id)
    if (results.length > 0){
      return response(res, 200, true, results)
    }else {
      return response(res, 400, false, 'Data chat not found')
    }
  }catch(error){
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailChat = async (req, res) => {
  try{
    const sender = req.userData.id
    const receiver = req.params.id
    const results = await chatModel.detailChat(receiver, sender)
    if (results.length > 0) {
      return response(res, 200, true, results[0])
    }else {
      return response(res, 400, false, 'Detail chat not found')
    }
  }catch(error) {
    console.log(error)
    return response(res, 500, false, 'Bad Request')
  }
}

exports.deleteChat = async (req, res) => {
  try{
    const receiver = Number(req.body)
    const message = toSring(req.query)
    // const receiver = Number(req.params.id)
    const sender = req.userData.id
    const deleteChat = await chatModel.deleteChat(receiver, message, sender)
    console.log(deleteChat)
    if (deleteChat) {
      return response(res, 200, true, 'Message deleted')
    }else{
      return response(res, 400, false, 'Delete message failed')
    }
  }catch (error){
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}