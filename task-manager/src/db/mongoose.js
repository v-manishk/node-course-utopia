const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
    // useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Provide valid email')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//             if (value.length <= 6) {
//                 throw new Error('Password is too short')
//             } else if (value.toLowerCase() === 'password') {
//                 throw new Error('Password can\'t be password or PASSWORD or in cannot be in same sequence of same character samajh jao')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '        ManishKumar Vishwakarma     ',
//     email: 'maNishkUmar.vIshwakarMA@UTOPIAtech.In         ',
//     age: 22,
//     password: '     pass     '
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log('Error!', error)
// })



// task
const User2 = mongoose.model('User2', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const me = new User2({
    description: '      Tryping on Validation       '
})

me.save().then((save) => {
    console.log('Success!', save)
}).catch((error) => {
    console.log('Error!', error)
})