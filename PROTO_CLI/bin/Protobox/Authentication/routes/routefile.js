const express      = require('express');
const router       = new express.Router()
const Testmor         = require('../models/models')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes   = require('./propriety')


//Route pour s'incrire
router.post('/register', async (req,res) => {
    const testmor = new Testmor(req.body);
    try{
        const token = await testmor.newAuthToken()
        res.status(201).send({testmor, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/connected', authenticate ,async (req,res)=> {
   res.send(req.testmor)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/connected/update',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.testmor._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.testmor[update] = req.body[update]) 
        await req.testmor.save()
        res.send(req.testmor);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/login', async (req, res) => {
    try {
        const testmor  = await Testmor.checkValidCredentials(req.body.email, req.body.password)
        const token = await testmor.newAuthToken()
        console.log(testmor,token)
        res.send({ testmor, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le testmor
router.delete('/delete/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.testmor._id)) {
        return res.status(404).send();
    }

    try {
        await req.testmor.remove()
        res.send(req.testmor)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/logout', authenticate, async (req, res) => {
    try {
        req.testmor.tokens = req.testmor.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.testmor.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les testmors
router.post('/logoutall', authenticate, async (req, res) => {
    try {
        req.testmor.tokens = []
        await req.testmor.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
