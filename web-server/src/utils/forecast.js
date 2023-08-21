const request = require('request') 

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d2b74945b7b5e54b1a87af4525d0e56&query=' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=m'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the service', undefined)
        } else if (body.error) {
            callback('Unable to find the address. Try another Search', undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. Temperature is ' + body.current.temperature + ' degree out. But, feels like ' + body.current.feelslike + ' degree. Humidity is ' + body.current.humidity + '%.' 
            })
            
        }
    })
}
module.exports = forecast