const fs = require('fs')

// for creating
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJSON)


// for reading
// const dataBuffer = fs.readFileSync('1-json.json')
// // console.log(dataBuffer.toString())
// const dataJSON = dataBuffer.toString()

// const data = JSON.parse(dataJSON)

// console.log(data.title)

// challenge

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

console.log('Name: ' + data.name + '\nPlanet: ' + data.planet + '\nAge: ' + data.age)
 
data.name = 'ManishKumar Vishwakarma'
data.age = 22

const detailJSON = JSON.stringify(data)

fs.writeFileSync('1-json.json', detailJSON)

