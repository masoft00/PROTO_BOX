const validator = require('validator');
const data={
prenom: { type: String,required: false, unique: false},
nom: { type: String,required: false, unique: false},
}
 module.exports.data=data;