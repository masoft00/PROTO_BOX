const express      = require('express')
const router       = new express.Router()
const Authen       = require('../models/models')
const { ObjectID } = require('mongodb')
const authenticate = require('../middleware/auth')
const proprietes   = require('./propriety')

//Route pour s'incrire
router.post('/authens', async (req, res) => {
  const authen = new Authen(req.body)
  try {
    const token = await authen.newAuthToken()
    res.status(201).send({ authen, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

//route qui donne l'utilisateur qui s'est connecté
router.get('/authens/me', authenticate, async (req, res) => {
  res.send(req.authen)
})

//route qui modifie l'utilisateur qui s'est connecté
router.patch('/authens/me', authenticate, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = proprietes.propriety.tab;
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  const _id = req.authen._id

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid request' })
  }

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }

  try {
    updates.forEach(update => (req.authen[update] = req.body[update]))
    await req.authen.save()
    res.send(req.authen)
  } catch (error) {
    res.status(400).send()
  }
})

//Route pour se loger
router.post('/authens/login', async (req, res) => {
  try {
    const authen = await Authen.checkValidCredentials(
      req.body.email,
      req.body.password
    )
    const token = await authen.newAuthToken()
    console.log(authen, token)
    res.send({ authen, token })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

//route pour supprimer le authen
router.delete('/authens/me', authenticate, async (req, res) => {
  if (!ObjectID.isValid(req.authen._id)) {
    return res.status(404).send()
  }

  try {
    await req.authen.remove()
    res.send(req.authen)
  } catch (error) {
    res.status(500).send()
  }
})

// route pour se deconnecter
router.post('/authens/logout', authenticate, async (req, res) => {
  try {
    req.authen.tokens = req.authen.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.authen.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

//route pour deconnecer tous les authens
router.post('/authens/logoutall', authenticate, async (req, res) => {
  try {
    req.authen.tokens = []
    await req.authen.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
