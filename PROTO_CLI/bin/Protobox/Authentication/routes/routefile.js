const express      = require('express');
const router       = new express.Router()
const User         = require('../models/models')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
//const mor =require('./propriety')


//Route pour s'incrire
router.post('/athentis', async (req,res) => {
    const athenti = new User(req.body);
    try{
        const token = await athenti.newAuthToken()
        res.status(201).send({athenti, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/athentis/me', authenticate ,async (req,res)=> {
   res.send(req.athenti)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/athentis/me',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.athenti._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.athenti[update] = req.body[update]) 
        await req.athenti.save()
        res.send(req.athenti);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/athentis/login', async (req, res) => {
    try {
        const athenti  = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await athenti.newAuthToken()
        console.log(athenti,token)
        res.send({ athenti, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le athenti
router.delete('/athentis/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.athenti._id)) {
        return res.status(404).send();
    }

    try {
        await req.athenti.remove()
        res.send(req.athenti)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/athentis/logout', authenticate, async (req, res) => {
    try {
        req.athenti.tokens = req.athenti.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.athenti.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les athentis
router.post('/athentis/logoutall', authenticate, async (req, res) => {
    try {
        req.athenti.tokens = []
        await req.athenti.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
