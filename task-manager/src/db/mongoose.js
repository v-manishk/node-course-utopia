const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
    useNewUrlParser: true
    // useCreateIndex: true
})




// task
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const me = new Task({
//     description: '      Tryping on Validation       '
// })

// me.save().then((save) => {
//     console.log('Success!', save)
// }).catch((error) => {
//     console.log('Error!', error)
// })