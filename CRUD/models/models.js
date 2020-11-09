const mongoose = require('mongoose')
const datas = require('./data')
const mySchema = new mongoose.Schema(
    datas.data
)
module.exports = mongoose.model('Crud', mySchema)