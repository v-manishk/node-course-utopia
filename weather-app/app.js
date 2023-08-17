const request = require('request') 
const geocode = require('./utils/geocode')

// const url = 'http://api.weatherstack.com/current?access_key=6d2b74945b7b5e54b1a87af4525d0e56&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect ot the service')
//     } else if (response.body.error) {
//         console.log('Unable to find the location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out. It feels like " + response.body.current.feelslike + " degress out.")
//     }
// })


// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1Ijoidm1hbmlzaGsiLCJhIjoiY2xsZjRndnE0MHZ6ZjNxcWgyejgybXl2ayJ9.rgXHihdYnhUSXGYHiwdUsQ&limit=1'

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect ot the service')
//     } else if (response.body.error) {
//         console.log('Unable to find the location')
//     } else {
//         console.log(response.body.features[0].center[0] + " " + response.body.features[0].center[1])
//     }
// })

// const request = require('request') 

// const url = 'http://api.weatherstack.com/current?access_key=6d2b74945b7b5e54b1a87af4525d0e56&query=37.8267,-122.4233'

// request({ url: url }, (error, response) => {
//     const data = JSON.parse(response.body)
//     console.log(data.current)
// })




geocode('Andheri Mumbai', (error, data) => {
    if (data === undefined) {
        console.log('Error: ' + error)
    } else {
        console.log('Place is: ' + data.location)

        console.log(data)
    }
})