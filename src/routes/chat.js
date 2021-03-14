const router = require('express').Router()
const chatController = require('../controller/chat')
const authMiddleware = require('../middleware/auth')

router.post('/', authMiddleware.authCheck, chatController.createChat)
router.delete('/delete', authMiddleware.authCheck, chatController.deleteChat)
router.get('/detail',authMiddleware.authCheck, chatController.listChat)
router.get('/detail/:id',authMiddleware.authCheck, chatController.detailChat)


// const chatDB ={
//   'arka': [
//     {
//       message:'hi',
//       from:'deny',
//       timestamp: new Date().getTime()
//     },
//     {
//       message:'hello',
//       from: 'mee',
//       timestamp:new Date().getTime()
//     }
//   ]
// }

// //id untuk kirim dan terima pesan
// router.get('/:id', (req,res)=> {
//   const {id}= req.params
//   const {from}= req.query
//   if(!chatDB[id]) {
//     chatDB[id] = []
//   }
//   let results = null
//   if (from){
//     results= chatDB[id].filter(object=>object.from === from)
//   }else {
//     const sender = chatDB[id].map(object=>object.from)
//     results = Array.from(new Set(sender))
//   }
//   return res.json({
//     success: true,
//     message: 'chat history',
//     results
//   })
// })
// //untul kirim pesan ke id diatas
// router.post('/:id', (req,res)=> {
//   const {id} = req.params
//   const {from, message} = req.body
//   const chat = {
//     message,
//     from,
//     timestamp: new Date().getTime()
//   }
//   if(!chatDB[id]){
//     chatDB[id] = []
//   }
//   chatDB[id].push(chat)
//   return res.json({
//     success: true,
//     message: 'chat send',
//     // results: chatDB[from].filter(object=>object.from===id)
//   })
// })

module.exports = router