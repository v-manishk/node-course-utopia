const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')



// using this to deleteDatabase each time and giving fresh start and adding ad data to login
beforeEach(setupDatabase)

// testing fot signup
test('Should SignUp a new User', async () => {
    const response = await request(app).post('/users').send({
        name: "Manish V",
        email: "manishk@gmail.com",
        password: "Manish@123"
    }).expect(201)

    // Assert that database is changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response body
    // expect(response.body.user.name).toBe('Manish V')     for single values
    expect(response.body).toMatchObject({
        // the provide fields are mandatory to match and other the thses can be present
        user: {
            name: 'Manish V',
            email: "manishk@gmail.com"
        },
        token: user.tokens[0].token
    })

    // check if password is not stored as a plain text password
    expect(response.body.user.password).not.toBe('Manish@123')
})

// login
test('Should Login with given credential i.e. existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // feting user and check if second token matches the database
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

// bad login
test('Should Fail to login with bad credential', async () => {
    await request(app).post('/users/login').send({
        email: "bad@bad.bad",
        password: "Bad@123"
    }).expect(400)
})

// get profile after auth
test('Should get profile for user on authentication', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// should failed for profile view for unauth user
test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// should delete user account after auth
test('Should delete account for auth user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

// should not be able to delete account after unauth
test('Should not delete account for unauth user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// for profile pic upload
test('Should Upload Prifile Pic', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/pic1.jpeg')
        .expect(200)

    // checking if image data is buffer or not
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// Update valid field for auth user
test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Radheshyam"
        })
        .expect(201)

    // checking data if changed or not
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Radheshyam')
})

// Update invalid field for auth user
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Mumbai"
        })
        .expect(400)
})

// extra
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated