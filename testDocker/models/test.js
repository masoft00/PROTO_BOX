
const mongoose   = require('mongoose');
const fs         = require('fs');
const js_yaml    = require('js-yaml');
const fichier    = fs.readFileSync('conf.yml');
const data       = js_yaml.safeLoad(fichier);
const enty=data.entity;
const test = mongoose.Schema({
    
    prenom: {
       type: String, 
       required: true,
       trim: true
    },

});

module.exports = mongoose.model('FALL', test);