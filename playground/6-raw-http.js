const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=6d2b74945b7b5e54b1a87af4525d0e56&query=20,19&units=f'

const request = http.request(url, (response) => {

    let data = ''

    // it allow us to register the handler
    response.on('data', (chunk) => {
        data = data + chunk
        // console.log(chunk)
    })   

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error ', error)
})

request.end()