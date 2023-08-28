const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('#textMessage')
const $messageFormButton = $messageForm.querySelector('button')

const $sendLocation = document.querySelector('#share-location')

const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (wlcm) => {
    console.log(wlcm)
    const html = Mustache.render(messageTemplate, {
        message: wlcm
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // const msg = document.getElementById("textMessage").value
    const msg = $messageFormInput.value
    if (msg === '' || msg === null) {
        return alert('Please type a message to send')
    }

    // disable send button
    $messageFormButton.setAttribute('disabled', 'disabled')

    console.log('Message Send:', msg)
    const html = Mustache.render(messageTemplate, {
        message: 'Message Send:'+ msg
    })
    $messages.insertAdjacentHTML('beforeend', html)
    socket.emit('textMessageSend', msg, (error) => {

        // enabling the send button after sending message
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('Message Delivered!')
    })
})

$sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geo Location is not supported by your browser')
    }

    // disabling send location button
    $sendLocation.setAttribute('disabled', 'disabled')


    navigator.geolocation.getCurrentPosition((position) => {
        console.log('Send Location:', position.coords.latitude + ', ' + position.coords.longitude)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) => {
            $sendLocation.removeAttribute('disabled')
            if (error) {
                return console.log('Location not Delivered!')
            }
            console.log('Location Delivered!')
        })
    })
})

socket.on('locationMessage', (URL) => {
    console.log(URL)
    const html = Mustache.render(locationTemplate, {
        url: URL
    })
    $messages.insertAdjacentHTML('beforeend', html)
})