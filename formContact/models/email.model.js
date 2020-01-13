const mongoose = require('mongoose');
const validator = require('validator')


const email = mongoose.Schema({
    message: {
        type: String,
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
                throw new Error({ error: "L'adresse email est invalide" })
            }
        }
    },
    sujet: {
        type: String
    },
    message: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Email', email);