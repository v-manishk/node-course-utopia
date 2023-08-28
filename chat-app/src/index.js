const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome! to chat app')
    socket.broadcast.emit('message', 'A new User has joined')

    socket.on('textMessageSend', (msg, callback) => {
        const filter = new Filter()
        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }
        socket.broadcast.emit('message', 'Received Message: ' + msg)
        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        socket.emit('message', 'Location Sent!')
        socket.broadcast.emit('locationMessage', `https://google.com/maps?q=${latitude},${longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

server.listen(port, () => {
    console.log('Server up on port', port)
})