const express      = require('express');
const router       = new express.Router()
const User         = require('../models/models')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
//const mor =require('./propriety')


//Route pour s'incrire
router.post('/users', async (req,res) => {
    const user = new User(req.body);
    try{
        const token = await user.newAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/users/me', authenticate ,async (req,res)=> {
   res.send(req.user)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/users/me',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.user._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
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
router.post('/users/login', async (req, res) => {
    try {
        const user  = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        console.log(user,token)
        res.send({ user, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le user
router.delete('/users/me', authenticate, async (req,res) => {
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
router.post('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les users
router.post('/users/logoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
