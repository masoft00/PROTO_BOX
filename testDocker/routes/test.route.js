//Importation des modules
const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

//inclure mes models
const MOR     = require('../models/test.js');

router.post('/add', function (req, res) {
   const test = new MOR({
      //_id          : new mongoose.Types.ObjectId(),
      prenom       : req.body.prenom,
   });
  test.save().then(function (result) {
    console.log(result);
    res.status(200).json({
       success: "Utilisateur créer"
    });
 }).catch(error => {
    res.status(500).json({
       error: err
    });
 });
});


//exportation du module
module.exports = router;