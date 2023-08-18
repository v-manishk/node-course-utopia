const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const address = process.argv[2]

if (!address) {
    console.log('Please provide the address for forecast')
} else {
    geocode(address, (error, data) => {
        if (error) {
            console.log('Error: ' + error)
        } else {
            console.log(chalk.blue.bold('Latitude: ') + data.latitude)
            console.log(chalk.blue.bold('Longitude: ') + data.longitude)
            console.log(chalk.blue.bold('Place is: ')+ data.location)
    
            forecast(data.latitude, data.longitude, (error, dataWeather) => {
                if (error) {
                    console.log('Error: ' + error) 
                } else {
                    console.log(chalk.blue.bold(dataWeather.weather_descriptions) + '. Temperature is ' + chalk.green.bold(dataWeather.temperature) + '. But, feels like ' + chalk.green.bold(dataWeather.feelslike) + '.')
                }
            })
        }
    })   
}
