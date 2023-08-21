// get core node path module to manupulate path and access public folder
const path = require('path')

// getting the request module
const request = require('request')

// it get a single express function
// we can call it create a new express application
const express = require('express')   
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// to work with partials
const hbs = require('hbs')


// get the location of folder and file
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// app will store our express application
const app = express()

// getting port from the environment
const port = process.env.PORT || 3000

// define path for expressjs
const publicDirectoryPath = path.join(__dirname, '../public')
// can be use while views directory name is changes eg. template
const viewPath = path.join(__dirname, '../templates/views')
// path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

// tells express which templation engine we are going to use (setup handlebars engines)
app.set('view engine', 'hbs')
// setup handlebars voew location
app.set('views', viewPath)
// for hbs partials
hbs.registerPartials(partialsPath)


// serving the public directory
// app.use() is a way to customize a server
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// rendering root page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather Web App",
        name: "ManishKumar Vishwakarma"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        msg: "Want help, send your questions to us, we will try to resolve it",
        name: "ManishKumar Vishwkarma"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: 'Error: ' + error,
                address: req.query.address
            })
        } else {
            // console.log(chalk.blue.bold('Latitude: ') + latitude)
            // console.log(chalk.blue.bold('Longitude: ') + longitude)
            // console.log(chalk.blue.bold('Place is: ')+ location)
    
            forecast(latitude, longitude, (error, {forecast}) => {
                if (error) {
                    return res.send([
                        {
                            error: 'Error: ' + error
                        }, 
                        {
                            latitude,
                            longitude,
                            location,
                            Address: req.query.address
                        }
                    ])
                    // console.log('Error: ' + error) 
                } else {
                    res.send({
                        latitude,
                        longitude,
                        location,
                        address: req.query.address,
                        weather_forecast: forecast
                    })
                    // console.log(chalk.blue.bold(weather_descriptions) + '. Temperature is ' + chalk.green.bold(temperature) + '. But, feels like ' + chalk.green.bold(feelslike) + '.')
                }
            })
        }
    }) 

    // res.send({
    //     address: req.query.address,
    //     location: 'Earth',
    //     forecast: 32
    // })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            product: 'product not found'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        msg: "Help article not found",
        name: "ManishKumar Vishwakarma"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        msg: "404 page not found",
        name: "ManishKumar Vishwakarma"
    })
})

// start app server at port 3000
app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})