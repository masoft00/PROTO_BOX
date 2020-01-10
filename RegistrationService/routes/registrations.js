const express = require('express');
const router = express.Router();
const Model = require('../models/registration');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

//lister
router.get('/', async(req, res) => {
    try {
        const model=await Model.find()
        res.json(model)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

//make a registration
router.post('/', async(req, res) =>{
    const nouveau = new Model({
        "data.email":req.body.email,
        "data.password": req.body.password,
        "data.prenom":req.body.prenom,
        "data.nom":req.body.nom,
        "data.login":req.body.login,
        "data.username":req.body.username
    })
    //console.log(req.body);
    console.log(req.body.email);
    try {
        const newModel = await nouveau.save()
        res.status(201).json(newModel)
        console.log(newModel);
    } catch (err) {
        res.status(400).json({ message:err.message})
    }
})

module.exports = router;