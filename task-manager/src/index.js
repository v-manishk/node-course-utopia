const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskROuter = require('./routers/task')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskROuter)


app.listen(port, () => {
    console.log('Server is up on port', port)
})
