console.log('Client Side Java Script is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''
messageFour.textContent = ''
messageFive.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    const location = search.value

    fetch('/weather?address=' + encodeURIComponent(location) +'').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
                messageFour.textContent = ''
                messageFive.textContent = ''
                console.log(data.error)
            } else {
                messageOne.textContent = 'Latitude: ' + data.latitude
                messageTwo.textContent = 'Longitude: ' + data.longitude
                messageThree.textContent = 'Location: ' + data.location
                messageFour.textContent = 'Address: ' + data.address
                messageFive.textContent = 'Weather Forecast: ' + data.weather_forecast
                console.log(data)
            }
            
        })
    })

    // console.log(location)
})