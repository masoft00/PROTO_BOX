const express = require('express');
const router = express.Router();
//const Model = require('../models/registration');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({
    extended: true
}));

//création  modèle
router.post('/createCollection', async(req,res)=> {
    const userSchema = new mongoose.Schema({
        data:req.body
    });
    module.exports = mongoose.model('Model', userSchema)
    res.status(201);
})


//insérer dans le base
router.post('/inserer', async(req, res) =>{
    const Model = mongoose.model('Model');
    const nouveau = new Model({
        data:req.body
    })
    try {
        const newModel = await nouveau.save()
        res.status(201).json(newModel)
        console.log(newModel);
    } catch (err) {
        res.status(400).json({ message:err.message})
    }
})

module.exports = router;