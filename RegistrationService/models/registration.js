require("amd-loader");
const mongoose = require('mongoose')

define(['../read'], function(read) {
    //console.log(read.data);
    let data=read.data;
    data=JSON.parse(JSON.stringify(data))
    console.log(data);
    const userSchema = new mongoose.Schema({
        data
    })
    module.exports = mongoose.model('Model', userSchema)
});



