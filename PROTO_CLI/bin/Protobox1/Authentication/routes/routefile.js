const express = require('express');
const router = new express.Router()
const Register = require('../models/models')
const { ObjectID } = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes = require('./propriety')


//Route pour s'incrire
router.post('/register', async(req, res) => {
    const register = new Register(req.body);
    try {
        const token = await register.newAuthToken()
        res.status(201).send({ register, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//lister les registers
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
    res.send(req.register)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/connected/update', authenticate, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.register._id
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid request' })
    }
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach((update) => req.register[update] = req.body[update])
        await req.register.save()
        res.send(req.register);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/login', async(req, res) => {
    try {
        const register = await Register.checkValidCredentials(req.body.email, req.body.password)
        const token = await register.newAuthToken()
        console.log(register, token)
        res.send({ register, token })
    } catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }
})

//route pour supprimer le register
router.delete('/delete/me', authenticate, async(req, res) => {
    if (!ObjectID.isValid(req.register._id)) {
        return res.status(404).send();
    }
    try {
        await req.register.remove()
        res.send(req.register)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/logout', authenticate, async(req, res) => {
    try {
        req.register.tokens = req.register.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.register.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les registers
router.post('/logoutall', authenticate, async(req, res) => {
    try {
        req.register.tokens = []
        await req.register.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router