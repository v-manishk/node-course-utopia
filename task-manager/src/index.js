const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskROuter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request is disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if (req.method) {
//         res.status(503).send('Site under maintenance')
//     } else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskROuter)


app.listen(port, () => {
    console.log('Server is up on port', port)
})


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const pass = 'Mani'
// }