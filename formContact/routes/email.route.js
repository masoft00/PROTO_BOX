//Importation des modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//inclure mes models
const Email = require('../models/email.model');

//Ici le route pour envoyé mail
router.post('/', function(req, res) {
    const email = new Email({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        sujet: req.body.sujet,
        message: req.body.message,
    });
    email.save().then(function(result) {
        console.log(result);
        res.status(200).json({
            success: "Message Envoyé"
        });
    }).catch(error => {
        res.status(500).json({
            error: err
        });
    });
});

//exportation du module
module.exports = router;