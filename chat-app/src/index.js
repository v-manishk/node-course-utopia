const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/users')
const { error } = require('console')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // for joining user
    // options --> {username, roomname} && ...options --> username, roomname
    socket.on('join', ({ username, roomname }, callback) => {
        const {error, user} = addUser({id: socket.id, username, roomname})
        if (error) {
            return callback(error)
        }

        socket.join(user.roomname)
        socket.emit('message', generateMessage('Admin!', 'Welcome! to Chat App'))
        socket.broadcast.to(user.roomname).emit('message', generateMessage('Admin!', `${user.username} has joined`))

        // for sidebar updating list of users after a new user add
        io.to(user.roomname).emit('roomData', {
            roomname: user.roomname,
            users: getUserInRoom(user.roomname)
        })
        
        callback()
    })

    socket.on('textMessageSend', (msg, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }

        if (!user) {
            return callback(error)
        }
        io.to(user.roomname).emit('message', generateMessage(user.username, msg))
        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const user = getUser(socket.id)
        if (!user) {
            return callback(error)
        }

        // socket.emit('message', generateMessage('Location Sent!'))
        io.to(user.roomname).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${latitude},${longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.roomname).emit('message', generateMessage('Admin! ', `${user.username} has left!`))

            // for sidebar updating list of users after a existing user left
            io.to(user.roomname).emit('roomData', {
                roomname: user.roomname,
                users: getUserInRoom(user.roomname)
            })
        }
    })

})

server.listen(port, () => {
    console.log('Server up on port', port)
})