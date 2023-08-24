const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// for logout
router.post('/users/logout', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

// for logoutAll
router.post('/users/logoutall', auth, async (req, res) => {
    try {

        req.user.tokens = []

        await req.user.save()
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

/* This send back data of all the user so we donot want this so we modify with API call /users/me */
// router.get('/users', auth, async (req, res) => {
//     try {
//         const user = await User.find({})
//         res.status(302).send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// for getting the individual profile
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// for geting user by we donot need this as it is not good be able to fetch any user by id
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }
    try {
        
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => req.user[update] = req.body[update])
        
        await req.user.save()
        console.log(req.user)
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        // if (!req.user) {
        //     return res.status(404).send()
        // }

        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // we donot need this to remove a user insted we use remove method
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send
        // }
        
        await req.user.deleteOne()
        
        res.send(req.user)
    } catch(e) {
        console.log('error123')
        res.status(400).send(e)
    }
})

module.exports = router