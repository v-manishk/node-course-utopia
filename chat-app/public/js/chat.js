const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('#textMessage')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, roomname } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// for Auto Scrolling
const autoScroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild

    // Height of new messages
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // visible height
    const visibleHeight = $messages.offsetHeight

    // Height of Message container
    const containerHeight = $messages.scrollHeight

    // How far have i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}


socket.on('message', (wlcm) => {
    console.log(wlcm)
    const html = Mustache.render(messageTemplate, {
        username: wlcm.username,
        message: wlcm.text,
        createdAt: moment(wlcm.createdAt).format('h:mm:ss a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
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
        username: URL.username,
        url: URL.url,
        createdAt: moment(URL.createdAt).format('h:mm:ss a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

// for server to check username and roomname and allocate
socket.emit('join', { username, roomname }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

// for updating userList
socket.on('roomData', ({roomname, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        roomname,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})