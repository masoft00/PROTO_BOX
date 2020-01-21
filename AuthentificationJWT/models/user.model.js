const mongoose = require('mongoose');
//module pour verifier la validité des entrés
const validator = require('validator')

//ici la structure de ma table (shema)
const user = mongoose.Schema(
   {
    prenom:{
        type: 'String',
        required: true,
    },
    nom:{
        type: 'String',
        required: false,
    },
    adresse:{
        type: 'String',
        required: false,
    },

    adresse: req.body.adresse,
    dateNaissance: req.body.dateNaissance,
                email: req.body.email,
                password: hash
   
);

//exporter mon module
module.exports = mongoose.model('User', user);