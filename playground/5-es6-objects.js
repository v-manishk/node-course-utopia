// Object property shorthand

const { type } = require("os")

const name = 'Manish'
const userAge = 22

const user = {
    name,
    age: userAge,
    location: 'Mumbai'
}

console.log(user)


// Object destructuring

const product = {
    label: 'Red Notebook',
    price: 289,
    stock: 267,
    salePrice: undefined
}

// under normal condition
// const label = product.label
// const price = product.price

// ***while destructuring ***

// const {label, stock} = product
// console.log(label)

// creating new name for label and also creating
// blank variable which is not present in the product 
// it will assign the undefined to the not decleared variable

// const {label: productLabel, stock, rating} = product
// // console.log(label)          // throw error 
// console.log(productLabel)   // new label variable
// console.log(stock)
// console.log(rating)         // assign undefined to the variable


// eg
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)