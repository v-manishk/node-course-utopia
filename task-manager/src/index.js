const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// all these are promise methods

app.post('/users', (req, res) => {

    const user = new User(req.body)

    user.save().then((result) => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
    
})

app.get('/users', (req, res) => {
    User.find({}).then((user) => {
        res.status(302).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


app.post('/task', (req, res) => {

    const task = new Task(req.body)

    task.save().then((result) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
    
})

app.get('/task', (req, res) => {
    Task.find({}).then((task) => {
        res.status(302).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/task/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})



app.listen(port, () => {
    console.log('Server is up on port', port)
})