const express = require('express');
const router = express.Router();
const Crud = require('../models/models');
const app = express();
const { ObjectID } = require('mongodb')
const bodyParser = require('body-parser');
const proprietes = require('./propriety')

app.use(bodyParser.urlencoded({
    extended: true
}));

async function getLine(req, res, next) {
    try {
        crud = await Crud.findById(req.params.id)
        if (crud == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.crud = crud
    next()
}

//make a post
router.post('/', async(req, res) => {
    const nouveau = new Crud(req.body)
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
        const crud = await Crud.find()
        res.json(crud)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//afficher une ligne
router.get('/getOne/:id', getLine, (req, res) => {
    res.json(res.crud)
})

// Update one subscriber

const updates = Object.keys(req.body)
const allowedUpdates = proprietes.propriety.tab;
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
const _id = req.crud._id
if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid request' })
}
if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
}

(async() => {
    try {
        updates.forEach((update) => req.crud[update] = req.body[update])
        await req.crud.save()
        res.send(req.Crud);
    } catch (error) {
        res.status(400).send()
    }

})()
// router.patch('/:id', getLine, async(req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = proprietes.propriety.tab;
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     const _id = req.crud._id
//     if (!isValidOperation) {
//         res.status(400).send({ error: 'Invalid request' })
//     }
//     if (!ObjectID.isValid(_id)) {
//         return res.status(404).send();
//     }

//     try {
//         updates.forEach((update) => req.crud[update] = req.body[update])
//         await req.crud.save()
//         res.send(req.crud);
//     } catch {
//         res.status(400).json({ message: err.message })
//     }
// });
//supprimer une ligne

router.delete('/delete/:id', getLine, async(req, res) => {
    try {
        await res.crud.remove()
        res.json({ message: 'Deleted!!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router;