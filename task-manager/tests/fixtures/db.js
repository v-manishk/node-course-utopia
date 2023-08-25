const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// creating user1 Object Id
const userOneId = new mongoose.Types.ObjectId()

// creating user1 data to database
const userOne = {
    _id: userOneId,
    name: "shyam",
    email: "shyam@gmail.in",
    password: "Shyam@123",
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

// creating user2 Object Id
const userTwoId = new mongoose.Types.ObjectId()

// creating user2 data to database
const userTwo = {
    _id: userTwoId,
    name: "raju",
    email: "raju@gmail.in",
    password: "Raju@123",
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Creating task1 for testing AA",
    completed: true,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Creating task2 for testing BB",
    completed: false,
    owner: userTwoId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Creating task3 for testing CC",
    completed: false,
    owner: userOneId
}

// using this to deleteDatabase each time and giving fresh start and adding ad data to login
const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}