const express      = require('express');
const router       = new express.Router()
const Entite         = require('../models/entity')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
//const mor =require('./propriety')


//Route pour s'incrire
router.post('/entites', async (req,res) => {
    const entite = new User(req.body);
    try{
        const token = await entite.newAuthToken()
        res.status(201).send({entite, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/entites/me', authenticate ,async (req,res)=> {
   res.send(req.entite)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/entites/me',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.entite._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.entite[update] = req.body[update]) 
        await req.entite.save()
        res.send(req.entite);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/entites/login', async (req, res) => {
    try {
        const entite  = await Entite.checkValidCredentials(req.body.email, req.body.password)
        const token = await entite.newAuthToken()
        console.log(entite,token)
        res.send({ entite, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le user
router.delete('/entites/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.entite._id)) {
        return res.status(404).send();
    }

    try {
        await req.entite.remove()
        res.send(req.entite)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/entites/logout', authenticate, async (req, res) => {
    try {
        req.entite.tokens = req.entite.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.entite.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les users
router.post('/entites/logoutall', authenticate, async (req, res) => {
    try {
        req.entite.tokens = []
        await req.entite.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
