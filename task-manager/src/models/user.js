const mongoose = require('mongoose')
const validator = require('validator')



const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Provide valid email')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('Password is too short')
            } else if (value.toLowerCase() === 'password') {
                throw new Error('Password can\'t be password or PASSWORD or in cannot be in same sequence of same character samajh jao')
            }
        }
    }
})
    

module.exports = User