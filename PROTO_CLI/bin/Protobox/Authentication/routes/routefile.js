const express      = require('express');
const router       = new express.Router()
const Authentication         = require('../models/models')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes   = require('./propriety')


//Route pour s'incrire
router.post('/authentications', async (req,res) => {
    const authentication = new Authentication(req.body);
    try{
        const token = await authentication.newAuthToken()
        res.status(201).send({authentication, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/authentications/me', authenticate ,async (req,res)=> {
   res.send(req.authentication)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/authentications/me',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.authentication._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.authentication[update] = req.body[update]) 
        await req.authentication.save()
        res.send(req.authentication);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/authentications/login', async (req, res) => {
    try {
        const authentication  = await Authentication.checkValidCredentials(req.body.email, req.body.password)
        const token = await authentication.newAuthToken()
        console.log(authentication,token)
        res.send({ authentication, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le authentication
router.delete('/authentications/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.authentication._id)) {
        return res.status(404).send();
    }

    try {
        await req.authentication.remove()
        res.send(req.authentication)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/authentications/logout', authenticate, async (req, res) => {
    try {
        req.authentication.tokens = req.authentication.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.authentication.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les authentications
router.post('/authentications/logoutall', authenticate, async (req, res) => {
    try {
        req.authentication.tokens = []
        await req.authentication.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
