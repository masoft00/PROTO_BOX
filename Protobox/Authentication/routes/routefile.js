const express      = require('express');
const router       = new express.Router()
const Test         = require('../models/models')
const {ObjectID}   = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes   = require('./propriety')


//Route pour s'incrire
router.post('/register', async (req,res) => {
    const test = new Test(req.body);
    try{
        const token = await test.newAuthToken()
        res.status(201).send({test, token})
    }catch(e){
        res.status(400).send(e)
    }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/connected', authenticate ,async (req,res)=> {
   res.send(req.test)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/connected/update',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.test._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.test[update] = req.body[update]) 
        await req.test.save()
        res.send(req.test);
    } catch (error) {
        res.status(400).send()
    }

})

//Route pour se loger
router.post('/login', async (req, res) => {
    try {
        const test  = await Test.checkValidCredentials(req.body.email, req.body.password)
        const token = await test.newAuthToken()
        console.log(test,token)
        res.send({ test, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

//route pour supprimer le test
router.delete('/delete/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.test._id)) {
        return res.status(404).send();
    }

    try {
        await req.test.remove()
        res.send(req.test)
    } catch (error) {
        res.status(500).send()
    }
})

// route pour se deconnecter
router.post('/logout', authenticate, async (req, res) => {
    try {
        req.test.tokens = req.test.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.test.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//route pour deconnecer tous les tests
router.post('/logoutall', authenticate, async (req, res) => {
    try {
        req.test.tokens = []
        await req.test.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
