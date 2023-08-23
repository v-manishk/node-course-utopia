// Learning how we can apply chaining with mongoose

require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('64e4c501eae1aa3d9d17a442', {age : 23}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 23})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.lof(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    // console.log(user)
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('64e59cc41658e693c5a97050', 24).then((result) => {
    console.log('result!', result)
}).catch((e) => {
    console.log('error!', e)
})

// Task.findByIdAndDelete('64e5aa5858cd2c8521c68e8a').then((user) => {
//     console.log(user)

//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })