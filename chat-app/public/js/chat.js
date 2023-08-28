const socket = io()

socket.on('countUpdated', (count) => {
    console.log('The Count has been Updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})