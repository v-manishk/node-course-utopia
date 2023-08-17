const request = require('request') 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoidm1hbmlzaGsiLCJhIjoiY2xsZjRndnE0MHZ6ZjNxcWgyejgybXl2ayJ9.rgXHihdYnhUSXGYHiwdUsQ&limit=1'

    request({url : url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the address. Try another Search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode