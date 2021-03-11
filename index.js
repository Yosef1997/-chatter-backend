const express= require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const APP_PORT = 8080

const app= express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors('*'))
app.use(morgan('dev'))

const chatRouter = require('./src/routes/chat')

app.use('/chat', chatRouter)

app.get('/', (req, res)=> {
  res.send({
    success: true,
    message: 'Backend running!'
  })
})

app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`)
})