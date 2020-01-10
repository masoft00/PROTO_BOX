const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
      },
    fileType: {
        type: String,
        required: true
      },
    size: {
        type: Number,
        required: true,
      }
})

module.exports = mongoose.model('NewFile', fileSchema)