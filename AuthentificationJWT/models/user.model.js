const mongoose = require('mongoose');
//module pour verifier la validité des entrés
const validator = require('validator')

//ici la structure de ma table (shema)
const user = mongoose.Schema(
    data.Tables.user
);

//exporter mon module
module.exports = mongoose.model('User', user);