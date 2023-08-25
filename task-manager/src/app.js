const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskROuter = require('./routers/task')

const app = express()


app.use(express.json())
app.use(userRouter)
app.use(taskROuter)


module.exports = app