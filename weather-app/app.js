const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const address = process.argv[2]

if (!address) {
    console.log('Please provide the address for forecast')
} else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log('Error: ' + error)
        } else {
            console.log(chalk.blue.bold('Latitude: ') + latitude)
            console.log(chalk.blue.bold('Longitude: ') + longitude)
            console.log(chalk.blue.bold('Place is: ')+ location)
    
            forecast(latitude, longitude, (error, {weather_descriptions, temperature, feelslike}) => {
                if (error) {
                    console.log('Error: ' + error) 
                } else {
                    console.log(chalk.blue.bold(weather_descriptions) + '. Temperature is ' + chalk.green.bold(temperature) + '. But, feels like ' + chalk.green.bold(feelslike) + '.')
                }
            })
        }
    })   
}
