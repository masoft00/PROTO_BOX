const express = require('express');
const router = express.Router();
const Ordinateur = require('../models/models');
const app = express();
const bodyParser = require('body-parser');
const proprietes = require('./propriety')

app.use(bodyParser.urlencoded({
    extended: true
}));

async function getLine(req, res, next) {
    try {
        ordinateur = await Ordinateur.findById(req.params.id)
        if (ordinateur == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.ordinateur = ordinateur
    next()
}

//make a post
router.post('/', async(req, res) => {
    const nouveau = new Ordinateur(req.body)
    try {
        const newModel = await nouveau.save()
        res.status(201).json(newModel)
        console.log(newModel);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//lister
router.get('/getAll', async(req, res) => {
    try {
        const ordinateur = await Ordinateur.find()
        res.json(ordinateur)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//afficher une ligne
router.get('/getOne/:id', getLine, (req, res) => {
    res.json(res.ordinateur)
})

// Update one subscriber
router.patch('/:id', getLine, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = proprietes.propriety.tab;
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.ordinateur._id
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid request' })
    }
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach((update) => req.ordinateur[update] = req.body[update])
        await req.ordinateur.save()
        res.send(req.ordinateur);
    } catch {
        res.status(400).json({ message: err.message })
    }
});
//supprimer une ligne

router.delete('/delete/:id', getLine, async(req, res) => {
    try {
        await res.ordinateur.remove()
        res.json({ message: 'Deleted!!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;