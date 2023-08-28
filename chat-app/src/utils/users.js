const users = []

// addUser removeUser getUser getUserInRoom

// For Adding User
const addUser = ({id, username, roomname}) => {
    // clean data
    username = username.trim().toLowerCase()
    roomname = roomname.trim().toLowerCase()

    // validating data
    if (!username || !roomname) {
        return {
            error: 'Username and Roomname are required'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return user.roomname === roomname && user.username === username
    })

    if (existingUser) {
        return {
            error : 'Username is in Use'
        }
    }

    // storing user
    const user = {id, username, roomname}
    users.push(user)
    return {user}
}


// For Removing a User
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index === -1) {
        return {
            error: 'User not found'
        }
    } else {
        return users.splice(index, 1)[0]
    }

}

// For Getting a User
const getUser = (id) => {
    return users.find((user) => user.id === id)
}

// For Getting a User in a Perticular room
const getUserInRoom = (roomname) => {
    // roomname = roomname.trim().toLowerCase()
    return users.filter((user) => user.roomname === roomname)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}