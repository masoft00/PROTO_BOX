const data = {

    createdAt: {
        type: Date,
        default: Date.now
    },
    marque: { type: String, required: true, unique: false },

    prix: { type: Number, required: true, unique: false },

    couleur: { type: String, required: false, unique: false },
}
module.exports.data = data;