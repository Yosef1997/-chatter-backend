const express= require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env

const app= express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors('*rs'))
app.use(morgan('dev'))

const chatRouter = require('./src/routes/chat')

app.use('/chat', chatRouter)
app.use('/auth', require('./src/routes/auth'))
app.use('/user', require('./src/routes/user'))


app.get('/', (req, res)=> {
  res.send({
    success: true,
    message: 'Backend running!'
  })
})

app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`)
})