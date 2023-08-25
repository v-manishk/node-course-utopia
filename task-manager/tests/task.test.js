const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userOne, userOneId, userTwo, userTwoId, taskOne, taskTwo, taskThree, setupDatabase} = require('./fixtures/db')

// using this to deleteDatabase each time and giving fresh start and adding ad data to login
beforeEach(setupDatabase)

// temp test
test('Should Create Task for User', async () => {
    const response = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'For My Testing'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

// for userOne
test('Should Get Task for UserOne', async () => {
    const response = await request(app)
        .get('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(302)

    // const task = await Task.findById(response.body._id)
    // expect(task).not.toBeNull()
    expect(response.body.length).toEqual(2)
})

// for userTwo
test('Should Get Task for UserOne', async () => {
    const response = await request(app)
        .get('/task')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(302)

    expect(response.body.length).toEqual(1)
})

// deleting the task of userOne by userTwo should fail
test('Should fail to delete task of userOne by userTwo', async () => {
    await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

// extra
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks