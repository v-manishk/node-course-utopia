const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0
let message = ''

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome')

    // socket.on('increment', () => {
    //     count++
    //     // response to the perticular client
    //     // socket.emit('countUpdated', count) 

    //     // for to response each client on the server
    //     io.emit('countUpdated', count)
    // })

    socket.on('textMessageSend', (msg) => {
        io.emit('textMessageReceived', msg)
    })

})

server.listen(port, () => {
    console.log('Server up on port', port)
})