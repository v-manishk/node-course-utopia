// get core node path module to manupulate path and access public folder
const path = require('path')

// it get a single express function
// we can call it create a new express application
const express = require('express')   

// get the location of folder and file
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// app will store our express application
const app = express()

// serving the public directory
// app.use() is a way to customize a server
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// send response to the user when localport is hit
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Manish',
//         age: 22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Welcome to About Page</h1>')
// })

app.get('/weather', (req, res) => {
    res.send({
        location: 'Mumbai',
        forecast: 32
    })
})

// start app server at port 3000
app.listen(3000, () => {
    console.log('Server is running')
})