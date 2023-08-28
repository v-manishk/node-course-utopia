const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The Count has been Updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

socket.on('message', (wlcm) => {
    console.log(wlcm + ' to chat app')
})

socket.on('textMessageReceived', (msg) => {
    console.log('Received Message: ', msg)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // const msg = document.getElementById("textMessage").value
    const msg = e.target.elements.textMessage.value
    console.log('Message Send:', msg)
    socket.emit('textMessageSend', msg)
})