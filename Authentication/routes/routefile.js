const express = require('express');
const router = new express.Router()
const User = require('../models/models')
const { ObjectID } = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes = require('./propriety')


//Route pour s'incrire
router.post('/register', async(req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.newAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//lister les users
router.get('/lister', async(req, res) => {
    try {
        const test = await dfghjkl.find()
        res.json(test)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/connected', authenticate, async(req, res) => {
    res.send(req.user)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/connected/update', authenticate, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.user._id
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid request' })
    }
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/login', async(req, res) => {
    try {
        const user = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        console.log(user, token)
        res.send({ user, token })
    } catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }
})

//route pour supprimer le user
router.delete('/delete/me', authenticate, async(req, res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/logout', authenticate, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les users
router.post('/logoutall', authenticate, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router