const request = require('request') 

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d2b74945b7b5e54b1a87af4525d0e56&query=' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=m'
    request({url : url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the service', undefined)
        } else if (response.body.error) {
            callback('Unable to find the address. Try another Search', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                weather_descriptions: response.body.current.weather_descriptions[0],
                feelslike: response.body.current.feelslike
            })
            
        }
    })
}
module.exports = forecast