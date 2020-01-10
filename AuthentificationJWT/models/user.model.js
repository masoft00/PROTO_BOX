const mongoose = require('mongoose');
const validator = require('validator')


const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   prenom: {
      type: String, 
      required: true,
      trim: true
   },
   nom: {
      type: String, 
      required: true,
      trim: true
   },
   adresse: {
      type: String, 
      required: true,
      trim: true
   },
   dateNaissance: {
      type: Date, 
      required: true,
      trim: true
   },
   
   email: {
      type: String, 
      required: true,
      trim: true,
      unique: true,
      validate: value => {
         if (!validator.isEmail(value)) {
             throw new Error({error: "L'adresse email est invalide"})
         }
     }
   },
   password: {
      type: String, 
      required: true,
      trim: true
   }
});

module.exports = mongoose.model('User', user);